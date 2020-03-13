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

## TODO

- run 命令
- inspect 审查
