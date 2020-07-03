/**
 * @description welabx脚手架项目配置
 */

module.exports = {
    // 页面入口  不可删除!
    pages: {
        index: {
            entry:    './src/app/app.js',
            filename: 'index.html',
            template: './public/index.html',
            title:    'title',
        },
    },
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
        /* 开发阶段后台接口代理配置项
         * proxy 支持字符串和对象方式
         */
        proxy: {
            '/api': {
                target:       'https://www.xxx.com/api',
                secure:       false,
                timeout:      1000000,
                changeOrigin: true,
                pathRewrite:  {
                    ['^/api']: '/',
                },
            },
        }
    },
};
