# 使用教程

## 安装

```js
npm install @antv/g6
npm install welabx-g6
```

## 引入/使用

v0.4.x (不推荐)

```js
import WelabxG6 from 'welabx-g6';

const g6 = new WelabxG6({
  // config
});
const graph = g6.instance; // G6实例
graph.read(data);
graph.paint();
// 销毁实例
g6.destroy();
```

## v0.5+ (推荐)

```js
import G6 from '@antv/g6';
import registerFactory from 'welabx-g6';

const config = registerFactory(G6, {
  // g6 config
});

const graph = new G6.Graph(config);

graph.read(data);
graph.destory();
```

## 0.6+

> 注意: drag-shadow-node 行为会在拖拽节点时在节点上覆盖蓝色的虚拟节点, 并在拖拽结束后更新节点的位置. 不能与官方 drag-node 行为共存, 请准备两种 modes, 使用 setMode 切换 drag-node 和 drag-shadow-node. 其中 drag-shadow-node 仅支持本文档中指定的自定义节点

同样支持 UMD 直接引用了:

```js
import G6 from '@antv/g6';
const registerFactory = require('node_modules/library/welabx-g6').default;

registerFactory(G6, {
  // 其他配置
});
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
| hvh-edge | 自定义边 | 单向开口 |
| hvh-h-edge | 自定义边 | 双向开口 |

### 事件监听与通知

> 已支持事件列表

| 事件名称 | 回调参数 | 说明 |
| ---- | ---- | ---- |
| after-node-selected | event 对象 | 节点选中事件 |
| after-edge-selected | event 对象 | 边选中事件 |
| on-canvas-click | event 对象 | 鼠标点击画布事件 |
| on-canvas-dragend | event 对象 | 画布拖拽结束事件 |
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
| before-edge-removed | event 对象 | 边移除前的事件 |
| after-node-removed | event 对象 | 节点移除后的事件 |
| after-edge-removed | event 对象 | 边移除后的事件 |
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

graph.on('before-edge-removed', ({target, callback}) => {
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
// 节点 model 中添加 singleEdge 属性时, 拖拽锚点只能生成 1 条边
const model = {
  label: 'node',
  id:  '1', // 非必传
  // 形状
  type:  'rect-node', // e.target.dataset.shape
  // 坐标
  x:   e.clientX - 50,
  y:   e.clientY + 200,
  singleEdge: true, // 拖拽锚点只能生成 1 条边
};

graph.addItem('node', model);
```

> 自定义的 modes

- canvas-event
- delete-item
- select-node
- hover-node
- ~~drag-node~~ (自 0.6.0 开始已废弃)
- drag-shadow-node (自 0.6.0 新增)
- active-edge

### 关于 drag-shadow-node 行为

> 1. 该行为会在拖拽节点时在节点上覆盖蓝色的虚拟节点, 拖拽时仅移动虚拟节点坐标, 拖拽结束后才会更新原始节点的位置.

> 2. Behavior drag-shadow-node 与内置 Behavior drag-node 在行为上有冲突, 不能与官方 drag-node 行为共存, 请考虑改用 setMode 来分开两种错误, 或在以上两种行为的入参 shouldBegin 方法中添加逻辑处理来避免冲突.

> 3. 另外 drag-shadow-node 仅支持本文档中指定的自定义节点.

## 自定义G6实例

```js
import G6 from '@antv/g6';
import registerFactory from 'welabx-g6';

const config = registerFactory(G6, {
  // ...
});
const graph = new G6.TreeGraph(config);

graph.read({
  nodes: [{
    id:       'root',
    label:    'Root',
    children: [{
      id:   '1',
      data: {
        action: '初始化',
      },
      type:  'modelRect-node',
      style: { // 节点样式
        // fill: '#39495b',
      },
      // 左侧方条
      preRect: {
        show:   true, // 是否显示左侧方条
        width:  4,
        fill:   '#40a9ff',
        radius: 2,
      },
      labels: [{
        x:        -70,
        y:        -10,
        label:    '标题,最长10个字符~~',
        labelCfg: {
          maxlength: 10,
          style: {
            fontSize:  14,
            fill:      '#666',
          }
        },
      }, {
        x:        -70,
        y:        7,
        label:    '描述,最长12个字符~~~',
        labelCfg: {
          maxlength: 12,
          style: {
            fontSize:  12,
            fill:      '#999',
          }
        },
      }, {
        x:        -70,
        y:        24,
        label:    '第三行,最长16个字符,超出显示省略号~~~',
        labelCfg: {
          maxlength: 16,
          style: {
            fontSize:  10,
            fill:      '#ccc',
          }
        },
      }],
    }, {
      id:    '2',
      type:  'modelRect-node',
      style: {
        width:     230,
        height:    60,
        fill:      '#65b586',
        lineWidth: 0,
      },
      label:    '初始化事件和生命周期和其他',
      labelCfg: {
        maxlength: 10,
        style: {
          fill:      '#fff',
          stroke:    '#ccc',
        }
      },
    }],
  }]
});
```

## 注册自定义节点/边/行为

```js
import G6 from '@antv/g6';
import registerFactory from 'welabx-g6';

G6.registerNode('your-node', {
  // your code here
});
// 注册自定义边
G6.registerEdge('your-edge', {
  // your code here
});
// 注册自定义行为
G6.registerBehavior('your-behavior', {
  // your code here
});

const config = registerFactory(G6, {
  // ...
});
const graph = new G6.TreeGraph(config);
graph.read(data);
graph.paint();
// 销毁实例
graph.destroy();
```

## 二次继承

> \*-node 和 \*-edge 支持二次继承扩展状态回调了!
> 先继承 [*-node], 在生命周期中通过 stateApplying 方法进行状态值处理

```js
/* file 1 */
export default G6 => {
  G6.registerNode('your-unique-node', {
    shapeType: 'rect',
    draw (cfg, group) {
      return this.drawShape(cfg, group);
    },
    stateApplying (name, value, item) {
      // 继承更多状态回调, name 为自定义名称时可用
    },
  }, 'rect-node' /* 要继承的 *-node */);
}
// 二次扩展边
export default G6 => {
  G6.registerNode('your-unique-edge', {
    stateApplying (name, value, item) {
      // 继承更多状态回调, name 为自定义名称时可用
    },
  }, 'polyline-edge' /* 要继承的 *-edge */);
}
```

```js
/* file 2 */
import G6 from '@antv/g6';
import register from 'welabx-g6';
import nodeStateApply from 'file1.js';

const config = registerFactory(G6, {
  // ...
});

// after registerFactory
nodeStateApply(G6);

const graph = new G6.TreeGraph(config);

graph.read({
  // your data
});
```

## 完整案例

```js
import G6 from '@antv/g6';
import registerFactory from 'welabx-g6';

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
        style: {
          fill:      '#fff',
          textAlign:    'center',
          textBaseline: 'middle',
          fontWeight:   'bold',
          fontSize:     24,
        }
      },
      // 当前节点多状态样式, 覆盖全局样式, 仅对当前节点生效
      nodeStateStyles: {
        'nodeState:default': {
          fill: 'orange',
          labelCfg: {
            style: {
              fontWeight: 'normal',
            }
          }
        },
        'nodeState:hover': {
          fill: '#ffbd17',
          labelCfg: {
            style: {
              fontWeight: 'normal',
            }
          }
        },
        'nodeState:selected': {
          fill: '#f1ac00',
          labelCfg: {
            style: {
              fontWeight: 'bold',
            }
          }
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
        // 支持引用 G6内置箭头了!
        endArrow: {
          path:   G6.Arrow.rect(10, 10, 3),
          fill:   '#aab7c1',
          stroke: '#aab7c1',
        },
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
          animate:       false,
        },
        'edgeState:hover': {
          strokeOpacity: 0.6,
          stroke:        '#ccc',
          animate:       true,
          animationType: 'ball', // 内置 ball/dash 两种动画, 默认使用 dash
        },
        'edgeState:selected': {
          strokeOpacity: 1,
          stroke:        '#ccc',
        },
      },
    },
  ],
}

const minimap = new G6.Minimap({
  size: [200, 100],
});
const confg = registerFactory(G6, {
  container: 'id',
  width: 1000,
  height: 300,
  renderer: 'canvas', // 默认 canvas, 也可选用 svg, 但有些事件没有兼容, 也不打算兼容了, 只维护canvas版本
  // 自定义注册行为, 事件, 交互
  plugins: [minimap],
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
        fill: '#aab7c1',
        stroke: '#aab7c1',
      },
    },
  },
  // 默认节点不同状态下的样式集合
  nodeStateStyles: {
    'nodeState:default': {
      fill:   '#E7F7FE',
      stroke: '#1890FF',
      labelCfg: {
        style: {
          fontWeight: 'normal',
        }
      }
    },
    'nodeState:hover': {
      fill: '#d5f1fd',
      labelCfg: {
        style: {
          fontWeight: 'normal',
        }
      }
    },
    'nodeState:selected': {
      fill:   '#caebf9',
      stroke: '#1890FF',
      labelCfg: {
        style: {
          fontWeight: 'bold',
        }
      }
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

const graph = new G6.Graph(config);
graph.read(data);
```

## modelRect-node 与树图配置

```js
// 树形结构
data = {
  id: 'root',
  label: 'Root',
  type:  'modelRect-node',
  style: {
    // 节点样式
  },
  edgeStyle: { // 边的样式
    stroke: '#39495b',
  },
  children: [{
    type:  'modelRect-node',
    style: {
      fill: '#fff',
    },
    // 左侧方条
    preRect: {
      show: true, // 是否显示左侧方条
      width: 4,
      fill: '#40a9ff',
      radius: 2,
    },
    // logo图标, 注意: 坐标 (0, 0) 代表图形几何中心
    logoIcon: {
      show: true, // 是否显示图标
      x: 0, // 控制图标在横轴上的位置
      y: 0, // 控制图标在纵轴上的位置
      // url 用于图标地址
      img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
      // 相对路径
      // img: require('../../image.png'),
      text: '\ue610;', // 用于支持 iconfont, text 是 iconfont.css 中的content, 注意加 u
      width: 16,
      height: 16,
      // 图标样式
      style:      {
        stroke: '#333',
        fill:   '#fc0',
      },
    },
    // 状态图标, 注意: 坐标 (0, 0) 代表图形几何中心
    stateIcon: {
      show:       true,       // 是否显示图标
      x:          70,         // 控制图标在横轴上的位置
      y:          10,         // 控制图标在纵轴上的位置
      text:       '\ue610',   // css中对应的content, 注意加 u
      fontFamily: 'iconfont', // 这里是css中定义的字体名称
      fontSize:   20,
      style:      {
        stroke: '#333',
        fill:   '#fc0',
      },
    },
    // 这里是数组! 这里是数组! 这里是数组!
    labels: [{
      label: '标题,最长10个字符~~',
      labelCfg: {
        maxlength: 10, // 超出10个字符显示省略号
        style: {
          fontSize: 14,
          fill:      '#666',
          textBaseline: 'middle',
          fontWeight:   'bold',
        }
      },
      className: 'node-text-0', // 可用于绑定自定义事件
    }, {
      label: '描述描述',
      labelCfg: {
        maxlength: 12,
        style: {
          fontSize: 12,
          fill:      '#999',
        }
      },
      className: 'node-text-1',
    }, {
      label: '第三行,最长16个字符,超出显示省略号~~~',
      labelCfg: {
        maxlength: 16,
        style: {
          fontSize: 10,
          fill:      '#ccc',
        }
      },
      className: 'node-text-2',
    }],
  }]
};
```

## 隐藏所有节点锚点

```js
  defaultNode: {
    anchorControls: {
      hide: true, // 隐藏所有锚点
    },
  }
```
