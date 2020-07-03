/**
 * @author claude
 * @date 2020/03/05
 */

const path = require('path');
const boxen = require('boxen');
const chalk = require('chalk');
const shell = require('shelljs');
const prompts = require('prompts');
const { existsSync } = require('fs');
const package = require('../../package.json');
const resolve = p => path.resolve(__dirname, "../", p);
const create = require('./create.js');
const warning = chalk.cyanBright;

const actionMap = {
    /**
     * * 创建项目
     */
    create: {
        options: [
            // ['-l, --local', '创建项目时不检查更新'],
            // ['-i, --install', '创建项目后自动安装依赖'],
            ['--git', '创建项目后自动执行 git init 命令'],
        ],
        description: '创建新项目        (create vue-website)',
        examples: ['welabx create'],
        action: async (appName, options) => {
            // console.log('appName:', appName, options);
            // 初始化自定义模版
            if (!await create.preCheck(appName)) return;

            const response = await prompts({
                type: 'select',
                name: 'templateName',
                message: warning('请选择项目模板:'),
                choices: [
                    {title: '简单开发模板', value: 'simple-template'},
                    {title: '通用开发模板', value: 'common-template'},
                ],
            });

            if (response.templateName) {
                // 检查全局环境下的依赖
                const globalDependencyPath = path.join(__dirname, '../../../', response.templateName);
                const localDependencyPath = path.resolve(__dirname, '../../project-templates', response.templateName);
                const dependencyPath = existsSync(globalDependencyPath) ? globalDependencyPath : localDependencyPath;

                console.log("\n正在准备创建项目模板... hold on ...\n");

                const projectPath = resolve(`${process.cwd()}/${appName}`);

                if (existsSync(projectPath)) {
                    const result = await create.dependencyCheck();
                    console.log('result', result);

                    if (!result) return;
                }

                // 复制项目模板
                await create.copyTemplate(appName, dependencyPath, projectPath);

                shell.cd(appName);
                // 自动安装依赖
                shell.exec('npm install');

                console.log('\n');
                console.log(boxen(`tips:\n依赖安装完成\n${chalk.greenBright(`cd ${appName}`)}  访问你的项目\n`,
                    {
                        padding: 1,
                        borderColor: 'green',
                        borderStyle: 'round',
                    }
                ));
                console.log('\n');

                if (options.git) {
                    shell.exec('git init');
                }

                // 检查模板更新
                await create.checkUpdate(response.templateName, dependencyPath);
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
