/**
 * @author claude
 * @date 2020/03/05
 * webpack 默认配置文件
 */

const webpack = require('webpack');
const portfinder = require('portfinder');
const WebpackDevServer = require('webpack-dev-server');
const { coreConfig, userConfig } = require('../../webpack/webpack.dev');
let merge = require('webpack-merge');

if (merge.merge) merge = merge.merge;

// 获取当前项目路径
const projectPath = process.env.INIT_CWD;

// 解析单页面/多页面入口
function hotUpdateEntry (port) {
    if (userConfig.pages) {
        for (let key in userConfig.pages) {
            // !!! 热更新
            coreConfig
                .entry(key)
                    .add(require.resolve(`${projectPath}/node_modules/webpack-dev-server/client`) + `?http://0.0.0.0:${port}/sockjs-node`)
                    .add(require.resolve(`${projectPath}/node_modules/webpack/hot/dev-server`))
                        .end()
        }
    }
}

async function dev () {
    /** 执行 webpackChain方法
     * 使用外部用户配置覆盖默认配置
    */
    if (userConfig.webpackChain) {
        userConfig.webpackChain(coreConfig);
    }

    // 检测可用端口
    portfinder.getPortPromise()
        .then(port => {
            // 添加热更新
            hotUpdateEntry(port);

            // 创建 compiler
            const webpackDevConfig = coreConfig.toConfig();

            // 临时解决element-ui 样式问题
            const finalConfig = merge(webpackDevConfig, {
                module: {
                    rules: [{
                        test: /\.(sc|c)ss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'postcss-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    implementation: require('dart-sass'),
                                },
                            },
                        ],
                        exclude: [/node_modules/],
                    }, {
                        test: /element-ui\/.*?js$/,
                        loader: ['babel-loader'],
                        exclude: [/node_modules/],
                    }, {
                        test: /node_modules\/.*?css$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'postcss-loader',
                        ],
                    }]
                },
            });

            const compiler = webpack(finalConfig);

            // 合并webpack配置 用户配置会覆盖默认配置
            const devServerOptions = Object.assign({}, {
                logLevel: 'silent',
                clientLogLevel: 'silent',
                hot: true,
                open: false,
                quiet: true,
                progress: false,
                compress: false,
                historyApiFallback: true,
                overlay: {
                    warning: true,
                    errors: true,
                },
                stats: {
                    colors: true,
                },
                // 用户配置覆盖默认配置
                ...userConfig.devServer
            });

            // 创建 DevServer
            const server = new WebpackDevServer(compiler, devServerOptions);

            // 监听当前端口
            server.listen(port, '0.0.0.0');

        });

}

module.exports = dev;
