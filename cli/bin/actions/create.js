/**
 * @author claude
 * @date 2020/03/05
 */

const {
    copy,
    mkdirs,
    writeFileSync,
} = require("fs-extra");
const ora = require("ora");
const path = require("path");
const boxen = require('boxen');
const chalk = require('chalk');                     // 彩色命令行提示
const prompts = require('prompts');                 // 命令行提示框交互
const spinner = ora(chalk.yellow('正在处理... hold on...'));
const resolve = p => path.resolve(__dirname, "../", p);
const { spawnSync } = require('child_process');
const { emptyDir } = require("fs-extra");
const warning = chalk.cyanBright;

module.exports = {
    // 模板预检
    async preCheck (appName) {
        let valid = true;

        // 检测项目名称
        const arg = /\/|\\|:|\*|\?|"|'|<|>|\|/g.test(appName);
        if (arg) {
            console.log(chalk.bgRed('项目名称不能包含 \\/:*?"<>| 等特殊字符!'));
            console.log(warning('请重新运行脚手架命令'));
            valid = false;
            return;
        }
        // 检测私有项目
        if (/^@/.test(appName)) {
            // 以@开头是私有项目
            const response = await prompts({
                type: 'select',
                name: 'inPrivate',
                message: warning('以@开头的是企业项目(需要付费账户才可以发布到npm), 你确定要创建私有项目吗?'),
                choices: [
                    {title: '是 (Yes)', value: 'y'},
                    {title: '否 (no)', value: 'n'},
                ],
            });
            if (response.inPrivate === 'n') {
                console.log(chalk.inverse('>_< 请重新运行命令并去除@符号'));
                valid = false;
                return valid;
            }
        }

        // 项目名称黑名单
        const blackList = ['node_modules', '.git', '.babelrc'];

        for (let i = 0, length = blackList.length; i < length; i++) {
            const item = blackList[i];
            if (appName === item) {
                console.log(chalk.red(`!!! 项目名称不能是: ${item}`));
                valid = false;
                return valid;
            }
        }
        return valid;
    },
    // 检测模板依赖
    async dependencyCheck () {
        let valid = true;

        const response = await prompts({
            type: 'select',
            name: 'overwrite',
            message: warning("文件夹已存在!!! 继续将会覆盖已有项目, 是否继续?\n"),
            choices: [
                {title: '是 (Yes)', value: 'y'},
                {title: '否 (no)', value: 'n'},
            ],
        });

        if (response.overwrite === 'n') {
            console.log('\n-------- 已退出 --------\n');
            valid = false;
        }
        return valid;
    },
    // 检查模版是否有更新
    async checkUpdate (tempDependencies, dependencyPath) {
        const template = require(resolve(`${dependencyPath}/package.json`));
        const localVersion = +template.version.replace(/\./g, '');

        const repos = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['view', tempDependencies, 'version']);
        const cloudVersion = +repos.stdout.toString().replace('\n', '').replace('\r\n', '').replace(/\./g, '');

        // 有更新
        if (cloudVersion > localVersion) {
            console.log('\n');
            console.log(boxen(`welabx-cli 脚手架项目模版 ${tempDependencies} 有新版可用\n${chalk.white('建议升级脚手架模版后重新创建项目')}\nnpm i ${tempDependencies} -g`,
                {
                    padding: 1,
                    borderColor: 'red',
                    borderStyle: 'double',
                    backgroundColor: '#89b537',
                }
            ));
            console.log('\n');
        }
    },
    async copyTemplate (appName, dependencyPath, projectPath) {
        spinner.start();

        try {
            await mkdirs(resolve(appName));
            // 复制项目模版
            await copy(resolve(dependencyPath), projectPath);

            // 更改包名等信息
            const packagePath = resolve(`${projectPath}/package.json`);
            const packageJson = require(packagePath);
            const packageFile = {
                description: '',
                scripts: '',
                devDependencies: '',
                keywords: '',
                author: '',
                license: '',
                dependencies: '',
            };

            for (let item in packageFile) {
                packageFile[item] = packageJson[item];
            }

            Object.assign(packageFile, {
                name: appName,
                version: '1.0.0',
                main: '',
                module: '',
            });

            writeFileSync(packagePath, JSON.stringify(packageFile, false, 4));

        } catch (err) {
            console.error(err)
            if (err.syscall === 'unlink') {
                console.log(chalk.red(`${err.path}被占用`));
            }
        }

        spinner.stop().succeed('项目创建成功! success!\n');

        console.log('正在安装项目依赖...\n');

    }
}
