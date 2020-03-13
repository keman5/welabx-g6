/**
 * @author claude
 * @date 2020/03/05
 */

const {
    existsSync,
} = require('fs');
const path = require("path");
const chalk = require('chalk'); // 彩色命令行提示
const shell = require('shelljs');
const package = require('../package.json');
const resolve = p => path.resolve(__dirname, "../", p);
const create = require('./create.js');
const warning = chalk.cyanBright;
// 模板依赖
const dependency = package.tempDependencies;

const actionMap = {
    /**
     * * 创建项目
     */
    create: {
        options: [
            ['-l, --local', '创建项目时不检查更新'],
            // ['-i, --install', '创建项目后自动安装依赖'],
            ['--git', '创建项目后自动执行 git init 命令'],
        ],
        description: '创建新项目        (create welabx-website)',
        examples: ['welabx create'],
        action: async (appName, options) => {
            // console.log('appName:', appName, options);
            // 初始化自定义模版
            if (!await create.preCheck(appName)) return;

            // 检查全局环境 vs 当前目录下的依赖
            const welabxEnv = path.resolve(__dirname, "../", `${dependency}`); // 路径有问题?
            const dependencyPath = existsSync(welabxEnv) ? welabxEnv : resolve(`node_modules/${dependency}`);

            if (existsSync(dependencyPath)) {
                console.log("\n打包依赖已安装, 正在准备处理...\nDependencies have been installed, hold on ...\n");

                const projectPath = resolve(`${process.cwd()}/${appName}`);

                if (existsSync(projectPath)) {
                    const result = await create.dependencyCheck();
                    console.log('result', result);

                    if(!result) return;
                }

                const result = await create.checkUpdate(options, dependency, dependencyPath, projectPath);

                if(!result) return;

                // 复制项目模板
                await create.copyTemplate(appName, dependencyPath, projectPath);

                shell.cd(appName);
                // 自动安装依赖
                shell.exec('npm install');

                if (options.git) {
                    shell.exec('git init');
                }
            } else {
                console.log(warning(`去全局安装 ${dependency} 吧\nPlease npm install ${dependency} -g first!\n`));
            }
        }
    },
    /**
     * * 审查当前webpack配置项
     */
    inspect: {
        options: [
            ['-m, --module', '审查 module 字段'],
            ['-r, --rule', '审查 rule 字段'],
            ['-p, --plugin', '审查 plugin 字段'],
        ],
        /**
         *  @param run build || dev
         *  @param env 指向项目根目录的 .env 文件
        */
        action (run, env) {
            // 切换到打包目录, 执行打包命令
            shell.cd(`${process.env.PWD}/webpack`);
            if (run === 'build') {
                shell.exec(`node build.js ${env || 'prod'}`);
            } else {
                shell.exec(`webpack-dev-server --config webpack.config.js ${env || 'test'}`);
            }
        }
    },
    /* config: {
        alias: 'c',
        description: '配置 .welabxrc    (config .welabxrc)',
        examples: [
            'welabx config set <key> <value>',
            'welabx config get <key>',
            'welabx config remove <key>',
        ]
    }, */
    '*': {
        description: '命令错误          (command error)',
    }
};

module.exports = actionMap;
