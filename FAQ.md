# 小朋友你是否有很多问号 (g6 五十问)

官方溯源:

- 如何选择和设置布局

  ```js
  new G6({
    layout: {
      //
    }
  });
  ```

  [官方出处](https://antv-g6.gitee.io/zh/docs/api/graphLayout/guide)

- 如何传入数据渲染

  [官方出处](https://antv-g6.gitee.io/zh/docs/api/graphFunc/data)

- 如何选择modes

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/mode)

- 什么是行为

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/defaultBehavior)

- 内置节点和边

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/overview)

- 如何自定义注册行为

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/custom-behavior)

- 如何自定义modes

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/mode)

- 如何自定义节点

  [官方出处1](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/nodes/custom-node)
  [官方出处2](https://antv-g6.gitee.io/zh/docs/api/registerItem)

- 如何继承节点

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/nodes/custom-node#%E6%89%A9%E5%B1%95-shape)

- item 生命周期

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/shape/shape-keyshape#shape-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

- 什么是 shape

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/shape/shape-keyshape)

- ￼如何给节点和边绑定事件

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/bindEvent)

- 如何给画布绑定事件

  [官方出处](https://antv-g6.gitee.io/zh/docs/api/Event)

- ￼如何设置节点和边的状态

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/states/state)

- 如何根据状态查找item

  [官方出处](https://antv-g6.gitee.io/zh/docs/api/graphFunc/find)

- 如何绘制自定义锚点

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/nodes/custom-node)

- 自定义锚点拖拽事件不生效

  [官方出处](https://antv-g6.gitee.io/zh/docs/manual/middle/elements/nodes/custom-node#1-%E4%BB%8E%E6%97%A0%E5%88%B0%E6%9C%89%E5%AE%9A%E4%B9%89%E8%8A%82%E7%82%B9)

- 如何让锚点更生动

  [官方出处](https://g6.antv.vision/zh/examples/scatter/node)

- 如何对非节点和边绑定事件

  ```js
  // 添加自定义锚点
  const anchor = group.addShape('circle', {
    attrs: {},
    draggable: true,
    // ...其他属性
  });

  // 这里支持所有鼠标事件, 键盘事件等
  anchor.on('click', () =- {
    // 想干啥干啥
  });
  ```

- 绑定事件 this 指向问题

  [仅供参考](https://github.com/keman5/welabx-g6/blob/54217b1fc293e9ff01a724822977f73d86d988eb/src/components/graph/shape/items/base-node.js#L228)

- 如何拖拽节点，位置如何计算

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/drag-node.js#L102)

- 如何生成拖拽节点的影子节点

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/drag-node.js#L158)

- 拖拽锚点时如何生成虚线

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/shape/items/anchor-event.js#L32)

- ￼如何自定义节点，边的样式和状态样式

  [官方出处](https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode#%E8%8A%82%E7%82%B9%E7%9A%84%E9%80%9A%E7%94%A8%E5%B1%9E%E6%80%A7)

- ￼事件触发了如何通知画布外部

  [官方出处](https://g6.antv.vision/zh/docs/api/Graph#oneventname-handler)
  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/drag-node.js#L60)

- ￼事件通知event 对象有哪些属性

  ```js
  //
  ```

- ￼外部如何更新节点属性和样式

  [官方出处](https://g6.antv.vision/zh/docs/api/Graph/#updateitemitem-model)

- 如何添加键盘事件，并在画布后防止事件仍然触发

  [官方出处](https://g6.antv.vision/zh/docs/api/Behavior)
  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/graph.js#L123)

- ￼group ，item ，children 有何区别

  [官方出处](https://g6.antv.vision/zh/docs/manual/advanced/keyconcept/graphics-group/)
  [官方出处](https://g6.antv.vision/zh/docs/api/nodeEdge/Item/)

- ￼tofront和toback的怪异现象，zindex为何不生效

  [官方出处](https://g6.antv.vision/zh/docs/api/nodeEdge/Item/#tofront)
  [官方出处](https://g6.antv.vision/zh/docs/api/Group/#addgroupcfg)

- ￼为何拖拽锚点生成虚线总是无法触发锚点事件

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/shape/items/anchor-event.js#L63)

- 如何防止状态冲突，如何处理

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/select-node.js#L47)

- 如何给画布设置鼠标样式

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/canvas-event.js#L20)

- 如何给边加上箭头

  [官方出处](https://g6.antv.vision/zh/docs/api/shapeProperties/#%E7%BA%BF%E6%9D%A1-path)

- 如何切换边的形状

  [官方出处](https://g6.antv.vision/zh/docs/manual/middle/elements/edges/defaultEdge#%E8%B0%83%E6%95%B4%E8%BE%B9%E7%9A%84%E6%A0%B7%E5%BC%8F)

- 如何添加字体图标

  ```js
  //
  ```

- 如何自定义锚点数量和位置

  [官方出处](https://g6.antv.vision/zh/docs/manual/middle/elements/anchorpoint/)

- 如何锁定节点位置

  ```js
  //
  ```

- ￼label 文字超长，如何处理？

- 内部根据item 宽高进行截取(很可能不理想)
- 传入data时就对文字进行截取(效果最理想)

- ￼如何创建自定义tooltip

  [官方出处](https://g6.antv.vision/zh/docs/manual/tutorial/plugins/#tooltip-%E8%8A%82%E7%82%B9%E6%8F%90%E7%A4%BA%E6%A1%86)

- ￼如何在删除时通知画布外部

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/delete-item.js#L45)

- ￼如何封装g6开箱即用

- api尽量简洁
- 与官方风格保持一致, 降低学习成本
- 预留事件通知外部进行决策
- 暴露注册插槽, 方便扩展
- 语义化书写更和谐

- ￼如何封装后支持注册行为

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/graph.js)

- 如何封装前暴露G6类用于注册插件

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/graph.js)

- 为什么初始化位置后拖动后被初始化的节点会移动

- 选择内置layout 会受内部计算影响, 导致重绘

- 继承节点源码浅析

  ```js
  //
  ```

- 如何使用线条背景插件

  ```js
  //
  ```

- 内容太多，使用minimap

  ```js
  //
  ```

- 如何将画布偏移量暴露给外部使用

  [仅供参考](https://github.com/keman5/welabx-g6/blob/master/src/components/graph/behavior/canvas-event.js#L40)

- 如何在时minimap拖拽通知内部

  ```js
  //
  ```

- ￼使用缩放插件时如何计算缩放比例

  ```js
  //
  ```

- 如何更新布局

  [官方出处](https://g6.antv.vision/zh/docs/api/Graph#updatelayoutcfg)

- 如何获取g6渲染后的数据

  [官方出处](https://g6.antv.vision/zh/docs/api/Graph#%E6%95%B0%E6%8D%AE)
