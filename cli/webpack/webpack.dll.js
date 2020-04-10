const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJson = require('../package.json');
const devMode = process.env.NODE_ENV !== 'production';
const context = (devMode ? '/' : `${packageJson.context}`) || '/';
const resolve = p => path.resolve(__dirname, '../', p);

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router', 'vuex'], // 'element-ui'
    },
    output: {
        path:     resolve(`dist${context}lib`),
        filename: '[name]_dll_[hash:7].js',
        library:  '[name]_dll_[hash:7]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: resolve(`dist${context}lib/[name]-manifest.json`),
            name: '[name]_dll_[hash:7]',
        }),
    ],
};
