/**
 * @author claude
 * @date 2020/03/05
 * webpack 默认配置文件
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { coreConfig, userConfig } = require('../../webpack/webpack.dev');

async function dev () {
    /** 执行 webpackChain方法
     * 使用外部用户配置覆盖默认配置
    */
    if (userConfig.webpackChain) {
        userConfig.webpackChain(coreConfig);
    }

    // 创建 compiler
    const webpackDevConfig = coreConfig.toConfig();
    const compiler = webpack(webpackDevConfig);

    // 合并webpack配置 用户配置会覆盖默认配置
    const devServerOptions = userConfig.devServer ? Object.assign({}, {
        hot:                true,
        open:               true,
        quiet:              true,
        progress:           false,
        compress:           false,
        historyApiFallback: true,
        overlay:            {
            warning: true,
            errors:  true,
        },
        stats: {
            colors: true,
        },
        ...userConfig.devServer
    }) : webpackDevConfig;

    // 创建 DevServer
    const server = new WebpackDevServer(compiler, devServerOptions);

    return new Promise((resolve, reject) => {

        server.listen(8080, '127.0.0.1', () => {
            resolve();
            console.log();
            console.log(`  App running at:`);
            console.log(`  http://localhost:8080`);
        });
    });
}

module.exports = dev;
