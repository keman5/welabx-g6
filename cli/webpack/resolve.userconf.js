/**
 * @author claude
 * @date 2020/03/05
 */
const { existsSync } = require('fs');
const { normalize } = require('path');
const projectPath = process.env.INIT_CWD;
const packageJson = require(`${projectPath}/package.json`);
const { original } = JSON.parse(process.env.npm_config_argv);
const projectName = original.find(item => item.includes('--project-name='));
let context = projectName ? projectName.split('=')[1] : packageJson.context || '/';

// 生产默认使用 prod
let STAGE = original[1] === 'build' ? 'prod' : 'test';

// npm run build -test
if (original[2] && original[2][0] === '-' && original[2][1] !== '-') {
    STAGE = original[2].substr(1);
}

const rcfile = normalize(`${process.env.INIT_CWD}/welabx-cli.conf.js`);

if (context.length > 1) {
    context = `/${context}/`;
}

const env = {
    context,
    projectPath,
    // packageJson,
    userConfig: {},
    isDev: original[1] !== 'build',
    STAGE,
}

// 查找配置文件
if (existsSync(rcfile)) {
    const userConfig = require(rcfile);

    env.userConfig = userConfig;
}

module.exports = env;
