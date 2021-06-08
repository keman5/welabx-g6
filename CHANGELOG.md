# CHANGELOG

## [0.3.1] 2020-05-12

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

## [0.4.2] 2020-06-28

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

## [0.4.6] 2020-10-16

- [upgrade] 升级 G6 到 3.8.x 版本
- [fix] 优化脑图边样式, 解决某些报错
- [fix] 修复直接更新数据时锚点状态内部报错
- [fix] 修复重复拖拽锚点判断逻辑, 防止生成多条重复的线
- [add] 节点 model 中添加 singleEdge 属性时, 拖拽锚点只能生成 1 条边
- [add] 新增变动画配置 animationType, 内置了 ball/dash 两种动画, 默认使用 dash
- [tips] nodeStateStyles 和 edgeStateStyles 支持配置节点和边动画, 参考[案例](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)

## [0.5] 2020-11-27 !重大更新

- [upgrade] 升级 G6 到 4.x 版本
- [upgrade] 重大更新! 实例化方法已经独立成注册方法, 只需极少的改动, 具体写法请参照[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md)!
- [add] 支持引用 G6 内置箭头了!

## [0.5.2] 2021-01-13

- [upgrade] 升级 G6 到 4.1.x 版本
- [upgrade] 提供的 *-node 节点均支持二次继承, 支持更多扩展可能性! 二次继承可参考[使用教程](https://github.com/claudewowo/welabx-g6/blob/master/GUIDE.md#二次继承)

## [0.5.4] 2021-02-07

- [fixed] 所有 labelCfg 样式配置调整为 labelCfg.style, 同官方 API
- [fixed] 修复其他状态更新报错 bug

## [0.6.0] 2021-04-25 !重大更新

- [upgrade] 升级 G6 到 4.2.x 版本, 0.6.0 版本以后请使用 antv/G6 v4.2.0+ 作为生产版本
- [fixed] 修复了拖拽节点后, 边未自动更新, 需要更新 modes 参数 drag-node 为 drag-shadow-node, 当使用 drag-node 时, 拖拽节点行为将使用官方内置行为, 如果需要使用虚拟节点拖拽效果, 请准备两种 modes, 使用 setMode 切换 drag-node 和 drag-shadow-node !!!

## [0.6.3] 2021-05-15

- [fixed] 修复某些报错和动画异常
- [changed] 完善 demo 案例功能

## [0.6.4] 2021-06-08

- [fixed] 更新删除边的事件名为 before-edge-removed
