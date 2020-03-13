/**
 * @author claude
 * date 07/05/2019
 * webpack 生产配置
 * ! 所有配置都可以通过外部配置文件覆盖
 */

const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const envFile = require('dotenv-extended').load({
    path: `${process.env.INIT_CWD}/.env`,
});
// 默认编译 prod
const STAGE = JSON.parse(process.env.npm_config_argv).cooked[2] || 'prod';
const { coreConfig, userConfig } = require('./webpack.common');
const env = {};

for (const key in envFile) {
    env[key] = JSON.stringify(envFile[key]);
}

coreConfig
    // 注入环境变量
    .plugin('definePlugin')
        .use(webpack.DefinePlugin, [{
            'process': {
                env: {
                    ...env,
                    STAGE,
                },
            },
        }])
        .end()
    .plugin('clean')
        .use(CleanWebpackPlugin, [{
            cleanOnceBeforeBuildPatterns: ['**/*', '!**/lib/**'],
        }])
        .end()
    .plugin('hashedmodule')
        .use(webpack.HashedModuleIdsPlugin)
        .end()

coreConfig.optimization
    .minimizer('css')
        .use(MiniCssExtractPlugin, [{
            filename:      'css/[name].[hash:7].css',
            chunkFilename: 'css/[id].[hash:7].css',
        }])
        .end()
    .minimizer('optimizeCSS')
        .use(OptimizeCSSAssetsPlugin, [{
            cssProcessor:        require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
            },
        }])
        .end()
    .minimizer('terser')
        .use(TerserJSPlugin, [{
            terserOptions: {
                warnings: false,
                output: {
                    comments: false,
                },
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            sourceMap: false,
            parallel: true,
        }])
        .end()
    .splitChunks({
        name: true,
        minChunks: 1,
        minSize: 30000,
        chunks: 'initial',
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    });

/** 执行 webpackChain方法
 * 使用外部用户配置覆盖默认配置
*/
if (userConfig.webpackChain) {
    userConfig.webpackChain(coreConfig);
}

module.exports = coreConfig.toConfig();
