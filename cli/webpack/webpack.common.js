/**
 * @author claude
 * @date 2020/03/05
 * webpack 默认配置文件
 */

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pathResolver = dir => `${projectPath}${dir.substr(1)}`;
const WebpackChain = require('webpack-chain');
// 获取 welabx-config.js 配置文件
const userConfig = require('./resolve.userconf');
// 获取当前项目路径
const projectPath = process.env.INIT_CWD;
// 核心配置项实例
const coreConfig = new WebpackChain();

// 解析单页面/多页面入口
function resolveEntry () {

    if (userConfig.pages) {
        for (let key in userConfig.pages) {
            const page = userConfig.pages[key];
            coreConfig
                .entry(key)
                    .add(pathResolver(page.entry))
                    .end()
                .plugin(`${key}-html`)
                    .use(HtmlWebpackPlugin, [{
                        filename: page.filename || `${key}.html`,
                        template: page.template ? `${projectPath}${page.template.substr(1)}` : `${projectPath}/public/index.html`,
                        favicon: (page.favicon ? `${projectPath}${page.favicon.substr(1)}` : `${projectPath}/public/favicon.ico`) || '',
                        title: page.title || 'title',
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeAttributeQuotes: true,
                        },
                    }])
        }
    }
}

coreConfig
    .mode('development')
    .output
        .path(`${projectPath}/${userConfig.outputDir || 'dist'}`)
        .filename(`${userConfig.assetsDir || 'static'}/js/[name].[hash].js`)
        .chunkFilename(`${userConfig.assetsDir || 'static'}/js/[name].[hash].js`)
        .publicPath(userConfig.publicPath || '/')
        .end()

// 添加单页面/多页面入口 js 和 html
resolveEntry();

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
        .add(`${projectPath}/node_modules`)
        .end()

coreConfig.resolve
    .alias
    .set('@', projectPath)
    .set('@src', `${projectPath}/src`)
    .set('@assets', `${projectPath}/src/assets`)
    .set('@comp', `${projectPath}/src/components`)
    .set('@views', `${projectPath}/src/views`);

coreConfig.context(projectPath)

coreConfig.module
    .rule('js')
        .include
            .add(`${projectPath}/src`)
            .end()
        .test(/\.js$/i)
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
    .rule('png')
        .include
            .add(`${projectPath}/src`)
            .end()
        .test(/\.(png|jpe?g|gif|svg)$/i)
            .use('img')
                .loader('url-loader')
                .options({
                    limit: 8192,    // 8k
                    name: `${userConfig.assetsDir || 'static'}/images/[name].[hash:7].[ext]`,
                    esModule: false,
                })
            .end()
        .end()
    .rule('font')
        .test(/.(eot|woff|woff2|ttf)$/i)
            .use('url')
                .loader('url-loader')
                .options({
                    limit: 8192,    // 8k
                    name: `${userConfig.assetsDir || 'static'}/fonts/[name].[hash:7].[ext]`,
                })
            .end()
        .end()
    .rule('vue')
        .include
            .add(`${projectPath}/src`)
            .end()
        .test(/\.vue$/i)
            .use('vue')
                .loader('vue-loader')
            .end()
        .end()
    /* .rule('scss')
        .test(/\.(sc|c)ss$/)
            .use('scss')
                .loader('style-loader')
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
    .rule('element-ui-js')
        .test(/element-ui\/.*?js$/i)
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
            .use('node_modules-css')
                .loader(MiniCssExtractPlugin.loader)
                .loader('css-loader')
                .loader('postcss-loader')
                    .options({
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')(),
                        ],
                    })
            .end()
        .end() */

coreConfig.watchOptions({
    //不监听的 node_modules 目录下的文件
    ignored: userConfig.transpileDependencies || [/node_modules/],
});

coreConfig
    .plugin('vue-loader')
        .use(VueLoaderPlugin)
        .end()
    .plugin('hardSource')
        .use(HardSourceWebpackPlugin)
        .end()
    .plugin('friendly-errors')
        .use(FriendlyErrorsPlugin)
        .end()
    .plugin('manifest')
        .use(ManifestPlugin)
        .end()

// 分析命令行参数
const args = JSON.parse(process.env.npm_config_argv).cooked;

// 添加WebpackBundleAnalyzer插件
if (args.includes('--report')) {
    coreConfig
        .plugin('report')
            .use(WebpackBundleAnalyzer)
            .end()
}

module.exports = {
    coreConfig,
    userConfig,
};
