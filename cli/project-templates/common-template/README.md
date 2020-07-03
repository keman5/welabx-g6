
# 前台地址

[测试环境](http://xxx.com/xxx-website/)

## 环境准备

> 安装 nodejs, 版本 10.x

```shell
# mac:
brew install node@10
# Windows: https://nodejs.org/en/download/ 下载并安装

# 安装完成命令行执行:
node -v
```

## 编译命令

```shell
# cd 到项目下
npm install # 仅首次安装时
npm run dev # 开发命令
npm run build # 打包命令
npm run build -- dev # 打包不同的环境
# npm install太慢 可以试试用 yarn 安装
```

## 脚手架项目模板

### Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run dev -XXX (XXX 为环境，不写默认为test)
```

### Compiles and minifies for production

```shell
npm run build -XXX (XXX 为环境，不写默认为test)
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## welabx-cli.conf 默认配置项

> 这是完整的webpack配置项示例, chainWebpack 用法请查阅 webpack-chain.
> 部分使用方法参照了vue-cli, 例如 替换loader操作

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

## 其他

[前端框架](https://element.eleme.cn/#/zh-CN)

[皮肤样式](https://sleek.tafcoder.com/form-advance.html)

## vscode 编辑器(格式化)配置项

编辑器插件: prettier, eslint, vetur, JavaScript (ES6) code snippets, tabnine

```json
{
    "editor.formatOnSave": false, // 必选
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "react",
        "html",
        "vue",
    ],
    "emmet.syntaxProfiles": {
        "postcss": "css",
        "vue-html": "html",
        "vue": "html",
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.ts": "vscode-typescript",
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.options.tabSize": 4,
    "vetur.format.options.useTabs": false,
    "vetur.format.scriptInitialIndent": true,
    "vetur.format.styleInitialIndent": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}
```
