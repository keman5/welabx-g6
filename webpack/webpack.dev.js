/*!
 * @author claude
 * date 07/05/2019
 * webpack dev 配置
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { webpackConfig } = require('./webpack.common.js');
const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
];

const devServer = {
    mode:      'development',
    devtool:   '#source-map',
    devServer: {
        compress:           true,
        historyApiFallback: true,
        contentBase:        path.join(__dirname, '../dist'),
        host:               '127.0.0.1',
        port:               4300,
        hot:                true,
        open:               true,
        progress:           false,
        quiet:              true,
        overlay:            {
            warning: true,
            errors:  true,
        },
        proxy: {},
    },
    watchOptions: {
        ignored: [
            'node_modules',
        ],
    },
    plugins,
};

module.exports = merge(webpackConfig, devServer);
