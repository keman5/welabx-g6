/**
 * @author claude
 * date 07/05/2019
 * webpack dev 配置
 */

const boxen = require('boxen');
const webpack = require('webpack');
/* const envFile = require('dotenv-extended').load({
    path: `${process.env.INIT_CWD}/.env`,
}); */
// 默认编译 test
const STAGE = (JSON.parse(process.env.npm_config_argv).cooked[2] || 'test').replace(/(-|--)/, '');
const { coreConfig, userConfig } = require('./webpack.common');
// const env = {};

console.log(boxen(`当前运行环境为 ${STAGE}`,
    {
        margin: 1,
        padding: 2,
        float: 'center',
        borderColor: 'green',
        borderStyle: 'round',
    }
));

/* for (const key in envFile) {
    env[`process.env.${key}`] = envFile[key];
}

env['process.env.STAGE'] = STAGE; */

coreConfig.devServer
    .color(true)

coreConfig
    // 注入环境变量
    .plugin('definePlugin')
        .use(webpack.DefinePlugin, [{
            'process.env': require('dotenv-extended').load({
                path: `${process.env.INIT_CWD}/.env`,
            }),
            'process.env.STAGE': JSON.stringify(STAGE),
        }])
        .end()
    // 热更新
    .plugin('HotModuleReplacement')
        .use(webpack.HotModuleReplacementPlugin)
        .end()
    .plugin('NamedModules')
        .use(webpack.NamedModulesPlugin)
        .end()

module.exports = {
    coreConfig,
    userConfig,
};
