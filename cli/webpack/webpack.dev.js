/**
 * @author claude
 * date 07/05/2019
 * webpack dev 配置
 */

const boxen = require('boxen');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const ManifestPlugin = require('webpack-manifest-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
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

coreConfig.devtool(userConfig.sourceMap !== undefined ? userConfig.sourceMap : 'cheap-module-eval-source-map');

coreConfig.devServer
    .color(true)

coreConfig
    .plugin('vue-loader')
        .use(VueLoaderPlugin)
        .end()
    .plugin('friendly-errors')
        .use(FriendlyErrorsPlugin)
        .end()
    .plugin('manifest')
        .use(ManifestPlugin)
        .end()

coreConfig
    // 注入环境变量
    .plugin('definePlugin')
        .use(webpack.DefinePlugin, [{
            'process.env': require('dotenv-extended').load({
                path: `${process.env.INIT_CWD}/.env`,
            }),
            'process.env.NODE_ENV':   JSON.stringify('development'),
            'process.env.STAGE': JSON.stringify(`${STAGE.toUpperCase()}`),
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
