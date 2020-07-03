# http 模块说明

## 模块划分

- src/assets/js/http 文件夹为 http 模块.
- httpCreate.js 中初始化了 axios 实例, 包含大部分内部系统处理逻辑, 属于基础服务.
- http.js 暴露了请求支持的方法, 并挂在到了 vue 原型上, 方便调用.
- 每个模块下应该在各自模块中创建 services.js, 用于将所有接口汇总, 方便查询和修改. 该文件中放置各个接口的默认参数. 在 vue 中调用 http 时将默认参数和实际入参传入, http 内部进行合并.

## 入参说明

- 新增 urltail, btnState, isCancel, isLogin, systemError 自定义参数
- 支持动态 url, 使用 urltail 传入字符串, 将自动合并到 url 末尾
- 请求响应无论怎样报错都会返回 code 和 msg, 所以你可以根据 code 进行不同错误的后续处理, 前台 code 提供了 'cancelled', 'timeout'

## 书写案例

```js
// 调用方式
this.$http.post({/*可选默认参数*/}, {
    /* ...入参 */
});

config = {
    (新增) urltail, url 后缀, 常用于动态分页
    (新增) btnState: {
        type, 支持单个字符串和数组 ['loading', 'disabled'], 默认为 'loading', 传入 false 将不作处理
        target, 点击事件 $event
    },
    (新增) isCancel, 是否可取消上次的请求
    (新增) isLogin, 验证是否需要登录才能发送请求
    (新增) systemError, 是否显示系统报错弹窗, 默认为 true
    baseURL, url 前缀
    timeout (Number), 请求超时
    headers (Object), 请求头字段
    params (Object), key=value 参数, 自动拼接到 url ? 后面
    data (Object), post
}

// @param {isCancel} Object 使用方法:
isCancel: {
    state: true / 'all', true 时只取消当前请求, 'all' 将取消所有请求
    msg: String, 主动取消时弹窗提示语, 非必传
}
```
