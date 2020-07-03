module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'vue'
    ],
    globals: {
        $app: true,
    },
    rules: {
        // 数组花括号两边的空格
        'array-bracket-spacing': [2, 'never'],
        // 'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
        // 在对象和数组中使用尾随逗号
        'comma-dangle': [2, 'always-multiline'],
        // 控制逗号在行尾出现还是在行首出现
        'comma-style': [2, 'last'],
        // 在非空文件的末尾添加空行
        'eol-last': 2,
        // 使用全等
        'eqeqeq': [2, 'allow-null'],
        // 给函数表达式命名
        'func-names': 0,
        // 无法解析 import 导入的值
        'import/no-unresolved': 'off',
        // 强制在对象冒号后面添加空格
        'key-spacing': [2, { "multiLine": { 'beforeColon': false, 'afterColon': true, "align": "value" } }],
        // 构造函数首字母必须大写
        'new-cap': 2,
        // 通过new关键字调用函数时不允许省略括号
        'new-parens': 2,
        // 声明的变量后新增空行
        'newline-after-var': 2,
        // 不能使用 alert
        'no-alert': 2,
        // 允许使用 console.log
        'no-console': 0,
        // 生产环境不允许使用 debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 不能声明重复的 key
        'no-dupe-keys': 2,
        // 不能声明重复的变量
        'no-dupe-args': 2,
        // 禁止使用不必要的分号
        'no-extra-semi': 2,
        // 不允许省略小数点前的 0
        'no-floating-decimal': 2,
        // 不允许使用无效的正则表达式字符串
        'no-invalid-regexp': 2,
        // 空行不允许超过两行
        'no-multiple-empty-lines': [1, { 'max': 2 }],
        // 不允许 new String，Number, Boolean
        'no-new-wrappers': 2,
        // 不允许调用 Math()，JSON()和Reflect()
        'no-obj-calls': 2,
        // 允许使用++
        'no-plusplus': 0,
        // 允许直接调用 hasOwnProperty 等
        'no-prototype-builtins': 0,
        // 不允许相同作用域下出现重复声明的变量
        'no-redeclare': 2,
        // 'no-shadow': 2,
        // 调用的括号要紧跟函数名
        'func-call-spacing': 2,
        // 不允许稀疏数组
        'no-sparse-arrays': 2,
        // 允许使用_开头或结尾
        'no-underscore-dangle': 0,
        // 当存在更简单的选择时，不允许使用三元运算符。
        'no-unneeded-ternary': 2,
        // 不允许未使用的表达式
        'no-unused-expressions': 0,
        // 未使用的变量
        'no-unused-vars': ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false, "varsIgnorePattern": "[_$iI]ndex|key|tem|val|value|[iI]gnored" }],
        // 使用前必须先声明
        'no-use-before-define': 0,
        // 不允许使用 var 声明变量
        'no-var': 2,
        'object-curly-spacing': [2, 'always'],
        // 强制使用简写语法
        'object-shorthand': 2,
        // 允许使用缩写运算符
        'operator-assignment': [0, 'always'],
        // 推荐使用 const
        'prefer-const': 2,
        // 使用展开运算符
        'prefer-spread': 2,
        // 使用单引号
        'quotes': [1, 'single'],
        // 强制提供基数 parseInt("071", 10)
        'radix': 2,
        // 不允许使用原子级变量更新, 例如 ctx.body = xxx; 改为 const _ctx = ctx; _ctx.body = xxx;
        'require-atomic-updates': 0,
        // 强制使用分号
        'semi': [2, 'always'],
        // 一元运算符前后空格
        'space-unary-ops': [2, { 'words': true, 'nonwords': false }],
        // 严格模式
        'strict': 2,
        // 不允许比较'NaN', 应该使用 isNaN(foo)
        'use-isnan': 2,
        // 强制执行有效的JSDoc注释
        'valid-jsdoc': 0,
        // 允许使用 v-html
        'vue/no-v-html': 0,
        // vue html 中的缩进
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': [],
        }],
        // vue 属性默认值
        'vue/require-default-prop': 0,
        // 单行元素及多行内容格式
        'vue/singleline-html-element-content-newline': ['error', {
            'ignoreWhenEmpty': true,
            'ignoreWhenNoAttributes': true,
            'ignores': ['html', 'body', 'article', 'hgroup', 'figure', 'main', 'section', 'header', 'footer', 'aside', 'nav', 'video', 'audio', 'canvas', 'details', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'dl', 'dd', 'ul', 'li', 'ol', 'label', 'form', 'input', 'img', 'textarea', 'th', 'tr', 'td', 'button', 'select', 'a', 'span', 'em', 'i', 'sub', 'sup', 'pre', 'code', 'table'],
        }],
    }
}
