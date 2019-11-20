const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    entry: {
        vendor: ['vue', 'vue-router', 'vuex'],
    },
    output: {
        path:     resolve('../dist/lib'),
        filename: '[name]_dll_[hash:7].js',
        library:  '[name]_dll_[hash:7]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: resolve('../dist/lib/[name]-manifest.json'),
            name: '[name]_dll_[hash:7]',
        }),
    ],
};
