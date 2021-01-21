# g6 流程图

## 项目背景

### 起源

公司项目中需要用到涉及表示关系的图谱, 所以在d3可以满足需求的情况下, 突然发现了G6, 在对比了性能和技术后续迭代, 我选择了G6作为技术支撑, 进而迈入可视化领域.

### 面向人群

适用于需要靠绘图来表达和描述关系的项目中, 官网所有支持的布局均可使用, 以及相关的开发者.

### 计划

在1.0时完整实现所有流程化的自定义功能, 并包含绝大部分可选的交互, 实现极高性能的绘图工具.

![截图, 显示不了就点👇gayhub 案例链接吧](https://github.com/claudewowo/welabx-g6/blob/master/screenshot/screenshot.png)

## 在线案例

[流程案例](https://claudewowo.github.io/welabx-g6/build/?_blank)

## 视频教程

> 欢迎关注我的 B 站教程, 不定时更新, 讲解各种图形绘制以及问题解决思路, 带你领略可视化的魅力:
[b站教程](http://www.bilibili.com/video/BV1YX4y1u7bB?share_medium=android&share_source=copy_link&bbid=XYECCEEEA651E106BC16F360C66C12F72B7CB&ts=1608714329434)

## G6 五十问

[五十个问题及解答](https://github.com/claudewowo/welabx-g6/blob/master/FAQ.md)

## 已完成功能

- 自定义节点和边, 支持锚点配置
- 自定义圆形, 方形, 椭圆, 菱形节点
- 节点支持拖拽连线, 删除(按delete键), 编辑
- 边默认带结束箭头, 支持标签显示
- 支持自定义 tool-tip 内容
- 支持画布/节点/边事件监听

## TODO

- [] 节点多选(shift), 拖动框选节点
- [] 拖拽节点到画布边缘时自动滚动画布可见范围
- [] 高亮显示与该节点连接的节点
- [] 锚点禁用状态及相关交互
- [] 节点锁定及加锁状态

- [x] 给节点设置图标
- [x] 边偶尔会被选中
- [x] 边动态动画
- [x] 拖拽边高亮及时消失
- [x] 节点和边 tooltip
- [x] 椭圆, 平行四边形节点
- [x] 边支持编辑箭头
- [x] 双击节点编辑标签
- [x] 画布缩放时的拖拽兼容
- [x] 解决拖拽时 null文字残留
- [x] 点击节点时将节点层级提升
- [x] 拖拽画布后拖拽锚点虚线位置错误

## 深度思考

- 边有相交时, 能否使用弧线跳过
- 如何将多个事件注册为插件
- ps 旋转和拖拽变形
- 对齐线如何实现
- 富文本功能栏

## 使用教程

[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)

## 运行案例

```ssh
npm install
npm run dev
// open 127.0.0.1:4300 in your browser
```

## 注意事项

> notes: 使用 cnpm 安装可能导致 import 路径报错, 建议使用npm或yarn, 另外发现使用 npm 安装内部依赖会自动更新, 导致G6内部出现报错, 如有报错, 请自行排查依赖版本. 请务必使用 package-lock 或 yarn.lock 锁定依赖版本!!!
> 有问题请在GitHub上提issue, 目前版本还有大部分功能要完善, 欢迎star

## 重要更新*

### [0.3.1] 2020-05-12

- 将 antv/g6 作为生产依赖
- 新增删除事件: after-node-removed 和 after-edge-removed
- 按delete键删除节点支持确认回调, 默认不再自动删除, 在 before-node-removed 事件回调中处理
- 节点和边支持双击事件 after-node-dblclick / after-edge-dblclick, 弊端: 单击事件会被触发两次
- *所有事件都返回 event 对象*
- 扩展 polyline-edge, line-edge, quadratic-edge, cubic-edge
- **事件回调中请使用 clientX 和 clientY, 否则拖拽后位置不准**
- 支持自定义锚点数量和位置(默认4个)
- 支持自定义边的类型,可通过事件设置
- 可自定义创建 tooltip
- 新增多状态样式管理
- 画布拖拽时在画布元素上新增移动 x,y 属性, 方便外部计算
- 单个节点和边支持多状态样式管理 (边为 cubic-edge 时暂时无效, 如需复杂样式在自定义事件中处理)
- **拖拽画布会引起偏移量变化, canvas-event modes 已内置了计算规则, 如未使用需自行计算, 并写入到canvas dx, dy 属性, 便于内部计算**
- 也可以通过监听 on-canvas-dragend 事件获取画布相对于渲染时的偏移量
- !!全局默认样式和多状态样式支持被单个节点或边的配置覆盖了
- [fix] 添加过的边不会重复添加了
- [fix] 边落在画布外时动画不会停止了
- [fix] 解决了拖拽事件绑定回调报错
- [add] 新增三角形节点, 目前仅支持上下两个方向

### [0.4.2] 2020-06-28

- [upgrade] !! 从 0.4.1 开始, 内部自动注册 G6.Graph实例, 可在 registerFactory 方法中 return new G6.TreeGraph(config) 来自定义不同的实例.
- [issue] 安装g6依赖时经常因版本不同而出现报错, 如出现 cannot read property 'transform' of undefined 报错, 请手动安装 @antv/g-base@0.4.6 版本, 出现类似报错请自行排查依赖项 !!! 或者删掉 package.lock 重新安装 g6
- [add] 新增全局节点配置项 anchorControls 用于控制锚点行为, 暂时只支持 hide 字段, 后续将进行扩展.

  ```js
    defaultNode: {
      anchorControls: {
        hide: true, // 隐藏所有锚点
      },
    }
  ```

- [add] 新增树形结构支持, 新增 hvh-edge(单向边) 和 hvh-h-edge(双向边) 两种边, 适用于脑图.
- [add] 所有自定义节点均可支持多行文本配置, 若同时设置 labels 和 label, 将显示 labels 配置, labels 中支持 className字段, 便于绑定自定义事件.
- [add] 新增 modelRect-node 类型节点, 支持添加多行标签及相应样式, 该配置与官方不尽相同, 请留意.
- [add] 所有自定义节点均支持 logoIcon 和 stateIcon 添加图标

### [0.4.6] 2020-10-16

- [upgrade] 升级 G6 到 3.8.x 版本
- [fix] 优化脑图边样式, 解决某些报错
- [fix] 修复直接更新数据时锚点状态内部报错
- [fix] 修复重复拖拽锚点判断逻辑, 防止生成多条重复的线
- [add] 节点 model 中添加 singleEdge 属性时, 拖拽锚点只能生成 1 条边
- [add] 新增变动画配置 animationType, 内置了 ball/dash 两种动画, 默认使用 dash
- [tips] nodeStateStyles 和 edgeStateStyles 支持配置节点和边动画, 参考[案例](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)

### [0.5] 2020-11-27 !重大更新

- [upgrade] 升级 G6 到 4.x 版本
- [upgrade] 重大更新! 实例化方法已经独立成注册方法, 只需极少的改动, 具体写法请参照[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)!
- [add] 支持引用 G6 内置箭头了!

### [0.5.2] 2021-01-13

- [upgrade] 升级 G6 到 4.1.x 版本
- [upgrade] 提供的 *-node 节点均支持二次继承, 支持更多扩展可能性! 二次继承可参考[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md#二次继承)
