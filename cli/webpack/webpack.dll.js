const path = require('path');
const webpack = require('webpack');
const projectPath = process.env.INIT_CWD;
const packageJson = require(`${projectPath}/package.json`);
const { original } = JSON.parse(process.env.npm_config_argv);
const cliParam = original.find(item => item.includes('--project-name='));
let context = cliParam ? cliParam.split('=')[1] : packageJson.context || '/';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
