/**
 * @author claude
 * date 07/05/2019
 * webpack dev 配置
 */

const boxen = require('boxen');
const webpack = require('webpack');
// 默认编译 test
const STAGE = (JSON.parse(process.env.npm_config_argv).cooked[2] || 'test').replace(/(-|--)/, '');
const { coreConfig, userConfig } = require('./webpack.common');

console.log(boxen(`当前运行环境为 ${STAGE}`,
    {
        margin: 1,
        padding: 2,
        float: 'center',
        borderColor: 'green',
        borderStyle: 'round',
    }
));

coreConfig.devServer
    .color(true)

coreConfig
    // 注入环境变量
    .plugin('definePlugin')
        .use(dotenvWebpack, {
            path: `${process.env.INIT_CWD}/.env`,
            defaults: false,
            systemvars: true,
            silent: true,
        })
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
