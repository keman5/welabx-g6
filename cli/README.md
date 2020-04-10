# welab 项目脚手架

快速搭建相同配置的项目.

## 安装

```js
// npm i nrm -g // 安装 nrm
// nrm add fenpm http://fenpm.xxx.com // 添加内部源
// nrm use fenpm // 切换至内部源
npm i welabx-cli -g
```

## 使用

```js
// 1. 初始化新项目(create a new project):
welabx create
welabx create <projectName> [options]
// @param {projectName} 必传
// @param {options} -l|--local 可选参数, 用于禁止检查版本更新
// @param {options} -i|--install 可选参数, 创建项目后自动安装依赖
welabx run build
welabx run dev
welabx inspect

// 2. 切换到项目目录
cd myplugin

// 3. 安装依赖
npm install
```

### 依赖包

- welabx-template

## welabx-cli.conf 默认配置项

```js
{
    // 公共资源请求路径
    publicPath: '/',
    // 打包输出路径
    outputDir:  'dist',
    // 静态资源输出路径
    assetsDir:  'static',
    /*
     * 支持多页面/单页面打包
    */
    pages:      {
        index: {
            entry: './src/main.js',
            // filename: 'index.html',
            // html 模板文件
            template: './public/index.html',
            // html 标题
            title: 'title',
            // favicon: '',
        },
        hello: {
            entry: './src/hello.js',
            // filename: 'index.html',
            // html 模板文件
            template: './public/index.html',
            // html 标题
            title: 'title',
            // favicon: '',
        },
    },
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [
        /node_modules/,
    ],
    // sourceMap
    sourceMap: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
    // webpack 配置项, 链式配置webpack, 脚手架内置了部分配置项, 这里可以进行覆盖, 优先级最高!
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
    // terser-webpack-plugin 配置项
    terserOptions: {},
    // 是否启用多线程进行生产编译, 默认为true
    parallel: true,
}
```

## TODO

- run 命令
- npm / yarn
- 动态配置 module.rules
- inspect 审查当前配置项
