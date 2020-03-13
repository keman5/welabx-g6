/**
 * @author claude
 * @date 2020/03/05
 */

module.exports = {
    // 公共资源请求路径
    publicPath: '/',
    // 打包输出路径
    outputDir:  'dist',
    // 静态资源输出路径
    assetsDir:  'static',
    /*
      * 多页面/单页面入口
      ! 当pages 为字符串格式时，
      ! 模板会被推导为 `public/index.html`
    */
    pages:      {
        index: {
            entry:    './src/main.js',
            // html 模板文件
            template: './public/index.html',
            // html 标题
            title:    'html-title',
        },
    },
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [
        /node_modules/,
        'public',
        'static',
    ],
    // 生产环境 sourceMap
    productionSourceMap: false,
    developmentSourceMap: '#source-map', // 默认为 '#source-map'
    // webpack 配置项, 链式配置webpack, 脚手架内置了部分配置项, 这里可以进行覆盖
    webpackChain(config) {
        // 在这里可以自定义 webpack 配置项
        /* config.optimization
            .splitChunks({
                cacheGroups: {},
            }); */

    },
    // 本地开发 devServer 配置
    devServer: {
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
        // proxy 支持字符串和对象方式
        // proxy: {}
    },
    // 是否启用多线程进行生产编译, 默认为true (thread-loader)
    parallel: true,
};
