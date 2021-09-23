# G6 流程图

## 在线 Demo

[https://claudewowo.github.io/welabx-g6/dist/?_blank](https://claudewowo.github.io/welabx-g6/dist/?_blank)
> 欢迎关注我的 B 站教程, 不定时更新, 讲解各种图形绘制以及问题解决思路, 带你领略可视化的魅力：[bilibli](http://www.bilibili.com/video/BV1YX4y1u7bB?share_medium=android&share_source=copy_link&bbid=XYECCEEEA651E106BC16F360C66C12F72B7CB&ts=1608714329434)
>
> G6 五十问：[五十个问题及解答](https://github.com/claudewowo/welabx-g6/blob/master/FAQ.md)
>
> 中文文档：[https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)
​

![image.png](https://cdn.nlark.com/yuque/0/2021/png/566082/1628650308370-fd5bee09-cac2-4752-b1af-423382e04160.png#clientId=u4603bf6b-29eb-4&from=paste&height=723&id=Mkmiz&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1446&originWidth=1580&originalType=binary&ratio=1&size=171292&status=done&style=none&taskId=u88aacbad-cb50-454a-9271-27a0b26b1a8&width=790)

## 起源

公司项目中需要用到涉及表示关系的图谱，在d3可以满足需求的情况下，发现了G6。在对比了性能和技术后续迭代，选择了G6作为技术支撑。
​

## 面向人群

🙋 适用于需要靠绘图来表达和描述关系的项目
🙋 官网所有支持的布局均可使用
🙋 以及领域相关的开发者
​

## 计划

1.0 版本完整实现所有流程化的自定义功能，并包含绝大部分可选的交互，实现极高性能的绘图工具。

## 已完成功能

😎 自定义节点和边, 支持锚点配置
😎 自定义圆形, 方形, 椭圆, 菱形节点
😎 节点支持拖拽连线, 删除(按delete键), 编辑
😎 边默认带结束箭头, 支持标签显示
😎 支持自定义 tool-tip 内容
😎 支持画布/节点/边事件监听

## TODO

- [x]  给节点设置图标
- [x]  边偶尔会被选中
- [x]  边动态动画
- [x]  拖拽边高亮及时消失
- [x]  节点和边 tooltip
- [x]  椭圆, 平行四边形节点
- [x]  边支持编辑箭头
- [x]  双击节点编辑标签
- [x]  画布缩放时的拖拽兼容
- [x]  解决拖拽时 null文字残留
- [x]  点击节点时将节点层级提升
- [x]  拖拽画布后拖拽锚点虚线位置错误
- [x]  节点多选(shift), 拖动框选节点
- [ ]  拖拽节点到画布边缘时自动滚动画布可见范围
- [ ]  高亮显示与该节点连接的节点
- [ ]  锚点禁用状态及相关交互
- [ ]  节点锁定及加锁状态

## 未来规划

🤔 边有相交时, 能否使用弧线跳过
🤔 如何将多个事件注册为插件
🤔 ps 旋转和拖拽变形
🤔 对齐线如何实现
🤔 富文本功能栏
​

## 如何开发

```shell
npm install
npm run dev
# open 127.0.0.1:4300 in your browser
```

## 注意事项

- 使用 `cnpm` 安装可能导致 `import` 路径报错, 建议使用`npm` 或`yarn`。
- 另外发现使用 `npm` 安装内部依赖会自动更新, 导致G6内部出现报错, 如有报错, 请自行排查依赖版本. 请务必使用 `package-lock` 或 `yarn.lock` 锁定依赖版本
- 有问题请在 GitHub 上提 issue, 目前版本还有大部分功能要完善, 欢迎 star
​

## 重要更新日志

[https://github.com/claudewowo/welabx-g6/blob/master/CHANGELOG.md](https://github.com/claudewowo/welabx-g6/blob/master/CHANGELOG.md)

### [0.5.4] 2021-02-07 !重大更新

- [upgrade] 升级 G6 到 4.1.x 版本
- [upgrade] 重大更新! 实例化方法已经独立成注册方法, 只需极少的改动, 具体写法请参照[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)!
- [upgrade] 提供的 *-node 节点均支持二次继承, 支持更多扩展可能性! 二次继承可参考[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md#%E4%BA%8C%E6%AC%A1%E7%BB%A7%E6%89%BF)
- [fixed] 所有 labelCfg 样式配置调整为 labelCfg.style, 同官方 API

### [0.6.0] 2021-04-25 !重大更新

- [upgrade] 升级 G6 到 4.2.x 版本, 0.6.0 版本以后请使用 antv/G6 v4.2.0+ 作为生产版本
- [fixed] 修复了拖拽节点后, 边未自动更新, 需要更新 modes 参数 drag-node 为 drag-shadow-node, 当使用 drag-node 时, 拖拽节点行为将使用官方内置行为, 如果需要使用虚拟节点拖拽效果, 请准备两种 modes, 使用 setMode 切换 drag-node 和 drag-shadow-node !!!

### [0.6.5] 2021-07-12

- [add] 为 drag-shadow-node 添加 shouldBegin 方法, 可在使用时进行自定义
- [add] 边和节点均支持二次扩展并通过 stateApplying 扩展更多状态
