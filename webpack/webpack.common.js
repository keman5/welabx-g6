/**
 * @author claude
 * @date 2020/03/05
 * webpack 默认配置文件
 */

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const resolve = p => path.resolve(__dirname, '../', p);
const WebpackChain = require('webpack-chain');
// 获取 welabx-config.js 配置文件
const userConfig = require('./resolve.userconf');

// 获取当前项目路径
const projectPath = process.env.INIT_CWD;
const isDev = process.env.NODE_ENV !== 'production';
// 核心配置项实例
const coreConfig = new WebpackChain();

coreConfig
    .mode(isDev ? 'development' : 'production')
    .entry('index')
        .add(`${projectPath}/src/main.js`)
        .end()
    .output
        .path(`${projectPath}/dist`)
        .filename(`js/[name].[${isDev ? 'hash' : 'chunkhash'}].js`)
        .chunkFilename(`js/[name].[${isDev ? 'hash' : 'chunkhash'}].js`)
        .publicPath(userConfig.publicPath || '/')
        .end()

coreConfig.resolve
    .mainFields
        .add('main')
        .end()
    .extensions
        .add('.js')
        .add('.vue')
        .add('.scss')
        .add('.json')
        .end()
    .modules
        .add(`${projectPath}/src`)
        .add('node_modules')
        .end()

coreConfig.resolve
    .alias
    .set('@', projectPath)
    .set('@src', `${projectPath}/src`)
    .set('@assets', `${projectPath}/assets`)
    .set('@comp', `${projectPath}/components`)
    .set('@views', `${projectPath}/views`);

coreConfig.module
    .rule('js')
        .exclude
            .add(/node_modules/)
            .end()
        .test(/\.js$/i)
            .use('cache')
                .loader('cache-loader')
            .end()
            .use('babel')
                .loader('babel-loader')
            .end()
        .end()
    .rule('png')
        .exclude
            .add(/node_modules/)
            .end()
        .test(/\.(png|jpe?g|gif|svg)$/i)
            .use('img')
                .loader('url-loader')
                .options({
                    limit: 8192,    // 8k
                    name: 'images/[name].[hash:7].[ext]',
                    esModule: false,
                })
            .end()
        .end()
    .rule('element-ui')
        .test(/element-ui\/.*?js$/)
            .use('cache')
                .loader('cache-loader')
            .end()
            .use('babel')
                .loader('babel-loader')
                .options({
                    presets: ['@vue/app'],
                    plugins: ['@babel/plugin-transform-runtime'],
                })
            .end()
        .end()
    .rule('node_modules_css')
        .test(/node_modules\/.*?css$/)
            .use('node_modules_css_loader')
                .loader(MiniCssExtractPlugin.loader)
            .end()
        .end()
    .rule('vue')
        .test(/\.vue$/i)
            .use('vue')
                .loader('vue-loader')
            .end()
        .end()
    .rule('css')
        .exclude
            .add(/node_modules/)
        .end()
        .test(/\.(sc|c)ss$/)
            .use('scss')
                .loader('style-loader')
                    .options({
                        loader: MiniCssExtractPlugin.loader,
                        hmr: isDev,
                    })
                .loader('css-loader')
                .loader('postcss-loader')
                    .options({
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')(),
                        ],
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                        },
                    })

coreConfig.watchOptions({
    //不监听的 node_modules 目录下的文件
    ignored: userConfig.transpileDependencies || [/node_modules/],
});

coreConfig.devServer
    .color(true)

coreConfig.devtool('cheap-module-eval-source-map');

coreConfig
    .plugin('vue-loader')
        .use(VueLoaderPlugin)
        .end()
    .plugin('html')
        .use(HtmlWebpackPlugin, [{
            template: resolve(userConfig.pages ? userConfig.pages.index.template : `${projectPath}/public/index.html`),
            favicon: resolve(userConfig.pages ? userConfig.pages.index.template : `${projectPath}/public/favicon.ico`) || '',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            chunksSortMode: 'dependency',
            inject: true,
        }])
        .end()
    .plugin('friendly-errors')
        .use(FriendlyErrorsPlugin)
        .end()
    .plugin('manifest')
        .use(ManifestPlugin)

module.exports = {
    coreConfig,
    userConfig,
};
