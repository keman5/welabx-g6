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

[gayhub 案例](https://claudewowo.github.io/welabx-g6/build/?_blank)

## G6 五十问

[五十个问题及解答](https://github.com/claudewowo/welabx-g6/blob/develop/FAQ.md)

## 已完成功能

- 自定义节点和边, 支持锚点配置
- 自定义圆形, 方形, 椭圆, 菱形节点
- 节点支持拖拽连线, 删除(按delete键), 编辑
- 边默认带结束箭头, 支持标签显示
- 支持自定义 tool-tip 内容
- 支持画布/节点/边事件监听

## TODO

- [] 给节点设置图标
- [] 节点多选(shift), 拖动框选节点
- [] 拖拽节点到画布边缘时自动滚动画布可见范围
- [] 高亮显示与该节点连接的节点
- [] 锚点禁用状态及相关交互
- [] 节点锁定及加锁状态

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

## 使用

```js
// 此处对G6做了层封装处理
import WelabxG6 from 'welabx-g6';

const data = {
  node: [
    {
      id:   '1',
      data: {
        // 业务数据
      },
      type:  'rect-node', // 对应注册的节点name, 还可以是 ellipse-node / rect-node / diamond-node 等
      style: {
        // ... 当前节点的样式
        r:   40, // 圆形节点半径
        fill:          'orange',
        lineDash:      [1, 2],
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowColor:   '#666',
        shadowBlur:    10,
        hover: {
          fill: '#ccc',
        },
        selected: {
          stroke: '#ccc',
        },
      },
      label:    'new Vue()', // 节点上显示的文字
      // node 文本默认样式
      labelCfg: {
        fill:         '#fff',
        textAlign:    'center',
        textBaseline: 'middle',
        fontWeight:   'bold',
        fontSize:     24,
      },
      // 当前节点多状态样式, 覆盖全局样式, 仅对当前节点生效
      nodeStateStyles: {
        'nodeState:default': {
          fill: 'orange',
        },
        'nodeState:hover': {
          fill: '#ffbd17',
        },
        'nodeState:selected': {
          fill: '#f1ac00',
        },
      },
    },
    {
      id:    'node-2',
      label: 'beforeCreate',
      type:  'rect-node',
      style: {
        radius: 2,
      },
      // 自定义锚点数量和位置(二维数组, 含义参见官网)
      anchorPoints: [
        [0, 0],
        [0.5, 0],
        [0, 1],
        [0.5, 1],
        [1, 0],
        [1, 1],
      ],
    },
  ],
  edges: [
    {
      source: '1', // 来源节点 id
      target: '2', // 目标节点 id
      label: '条件', // 边上的文字 / 当前只支持1个文案
      data:   {   // 当前边的自定义属性
        type:   'xxx',
        amount: '100,000 元',
        date:   '2019-08-03',
      },
      style: {
        stroke:          '#ccc',
        lineDash:        [5,5],
        lineWidth:       2,
        lineAppendWidth: 10,
      },
      labelCfg: {
        position:   'center', // 其实默认就是 center，这里写出来便于理解
        autoRotate: true,   // 使文本随边旋转
        style:      {
          stroke:    'white',  // 给文本添加白边和白色背景
          fill:      '#722ed1',  // 文本颜色
          lineWidth: 5,     // 文本白边粗细
        },
      },
      // 边的多状态样式, 会覆盖全局样式, 仅对这条边生效
      edgeStateStyles: {
        'edgeState:default': {
          strokeOpacity: 1,
          stroke:        '#ccc',
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          stroke:        '#ccc',
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          stroke:        '#ccc',
        },
      },
    },
  ],
}

const g6 = new WelabxG6({
  container: 'id',
  width: 1000,
  height: 300,
  renderer: 'canvas', // 默认 canvas, 也可选用 svg, 但有些事件没有兼容, 也不打算兼容了, 只维护canvas版本
  // 自定义注册行为, 事件, 交互
  registerFactory: (G6, cfg) => {
    const minimap = new G6.Minimap({
      size: [200, 100],
    });

    cfg.plugins = [minimap];

    return new G6.graph(cfg);
    // !!! 从 0.4.0 开始, 此方法为必传! 同时必须返回 g6 实例!
    // ! 拖拽画布会引起偏移量变化, 自定义事件需自行计算, 并写入到canvas dx, dy 属性, 便于内部计算
    // 也可以通过监听 on-canvas-dragend 事件获取画布相对于渲染时的偏移量
    // 另外 minimap 插件拖拽需写入 canvas dx和dy属性, 请自行实现, 插件那么多谁知道你要用哪个, 也许有空了我会内置进去?
  },
  defaultEdge: {
    type:  'polyline-edge', // 扩展了内置边, 有边的事件
    style: {
      radius:          5,
      offset:          15,
      stroke:          '#aab7c3',
      lineAppendWidth: 10, // 防止线太细没法点中
      /* startArrow:      {
          path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
          fill: '#aab7c3',
      }, */
      endArrow:        {
        path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
        fill: '#aab7c3',
      },
    },
  },
  // 默认节点不同状态下的样式集合
  nodeStateStyles: {
    'nodeState:default': {
      fill:   '#E7F7FE',
      stroke: '#1890FF',
    },
    'nodeState:hover': {
      fill: '#d5f1fd',
    },
    'nodeState:selected': {
      fill:   '#caebf9',
      stroke: '#1890FF',
    },
  },
  // 默认边不同状态下的样式集合
  edgeStateStyles: {
    'edgeState:default': {
      stroke: '#aab7c3',
    },
    'edgeState:selected': {
      stroke: '#1890FF',
    },
    'edgeState:hover': {
      stroke: '#1890FF',
    },
  },
  // ... 其他G6参数
});

const graph = g6.instance; // G6实例
graph.read(data);
graph.paint();
// 销毁实例
g6.destroy();
```

### 自定义节点和边(边支持设置箭头)

| 非内置节点和边 | type | 宽高/半径属性 |
| ---- | ---- | ---- |
| rect-node | 方形节点 | width, height, radius(圆角) |
| circle-node | 圆形节点 | r (半径) |
| ellipse-node | 椭圆节点 | rx, ry 椭圆焦距 |
| diamond-node | 菱形节点 | size, 默认 [80, 80] |
| triangle-node | 三角形节点 | size, 默认 [60, 100] direction, 默认 'up', 可设为 'down' |
| line-edge | 自定义边 | 默认属性 |
| polyline-edge | 自定义边 | 默认属性 |
| quadratic-edge | 自定义边 | 默认属性 |
| cubic-edge | 自定义边 | 默认属性 |

### 事件监听与通知

> 已支持事件列表

| 事件名称 | 回调参数 | 说明 |
| ---- | ---- | ---- |
| after-node-selected | event 对象 | 节点选中事件 |
| after-edge-selected | event 对象 | 边选中事件 |
| on-canvas-click | event 对象 | 鼠标点击画布事件 |
| on-canvas-dragend | event 对象(内置了画布偏移量dx, dy) | 画布拖拽结束事件 |
| on-node-mouseenter | event 对象 | 鼠标移入节点事件 |
| on-node-mousemove | event 对象 | 鼠标在节点上移动事件(持续触发) |
| on-node-mouseleave | event 对象 | 鼠标从节点上移开事件 |
| on-node-mousedown | event 对象 | 鼠标左键按下节点事件 |
| on-node-mouseup | event 对象 | 鼠标左键抬起节点事件 |
| on-node-dragstart | event 对象 | 节点拖拽开始事件(也是锚点拖拽事件) |
| on-node-drag | event 对象 | 节点拖拽中事件(也是锚点拖拽事件) |
| on-node-dragend | event 对象 | 节点拖拽结束事件(也是锚点拖拽事件) |
| on-node-drop | event 对象 | 在节点上释放事件(e.item 当前拖拽节点, e.target 当前释放节点) |
| on-edge-mouseenter | event 对象 | 同节点事件 |
| on-edge-mousemove | event 对象 | 同节点事件 |
| on-edge-mouseleave | event 对象 | 同节点事件 |
| before-node-removed | event 对象 | 节点移除前的事件 |
| after-node-removed | event 对象 | 节点移除后的事件 |
| after-node-dblclick | event 对象 | 双击节点事件 |
| after-edge-dblclick | event 对象 | 双击边事件 |
| before-edge-add | event 对象 | 添加边之前的事件 |

(回调中有些情况下是空, 有些回调会触发多次, 因为内部也在使用, 如果影响较大, 后期考虑减少空回调和重复回调)

```js
graph.on('after-node-selected', e => {
  if(e && e.item) {
    console.log(e.item.get('id'));
  }
});

graph.on('after-edge-selected', e => {
  if(e && e.item) {
    console.log(e.item.get('id'));
  }
});

graph.on('before-node-removed', ({target, callback}) => {
  console.log(target);
  setTimeout(() => {
    callback(true);
  }, 1000);
});

graph.on('before-edge-add', ({ source, target, sourceAnchor, targetAnchor }) => {
  setTimeout(() => {
    this.graph.addItem('edge', {
      source: source.get('id'),
      target: target.get('id'),
      sourceAnchor,
      targetAnchor,
      label:  'edge label',
      // ... item 其他属性
    });
  }, 1000);
});
// 自定义事件监听需在 registerFactory 中定义
```

### 添加节点

```js
const model = {
  label: 'node',
  id:  '1', // 非必传
  // 形状
  type:  'rect-node', // e.target.dataset.shape
  // 坐标
  x:   e.clientX - 50,
  y:   e.clientY + 200,
};

graph.addItem('node', model);
```

> 自定义的 modes

- canvas-event
- delete-item
- select-node
- hover-node
- drag-node
- active-edge

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

### [0.2.3] 2020-05-06

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

### [0.3.1] 2020-05-12

- 新增多状态样式管理
- 单个节点和边支持多状态样式管理 (边为 cubic-edge 时暂时无效, 如需复杂样式在自定义事件中处理)
- 画布拖拽时在画布元素上新增移动 x,y 属性, 方便外部计算
- **拖拽画布会引起偏移量变化, canvas-event modes 已内置了计算规则, 如未使用需自行计算, 并写入到canvas dx, dy 属性, 便于内部计算**
- 也可以通过监听 on-canvas-dragend 事件获取画布相对于渲染时的偏移量
- !!全局默认样式和多状态样式支持被单个节点或边的配置覆盖了

### [0.4.0] 2020-06-05

- [fix] 添加过的边不会重复添加了
- [fix] 边落在画布外时动画不会停止了
- [fix] 解决了拖拽事件绑定回调报错
- [add] 新增三角形节点, 目前仅支持上下两个方向
- [upgrade] !! 从 0.4.0 开始, 此方法为必传! 同时必须返回 g6 实例!
- [upgrade] 更新注册方法, 可以支持注册 TreeGraph 了, 将G6暴露, 方便自定义不同的实例
- 最近由于个人身体原因暂时没法继续更新, 不过现在可以继续维护了.
