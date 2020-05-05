# g6 流程图

- 自定义节点和边
- 自定义圆形, 方形, 椭圆, 菱形节点
- 节点支持拖拽连线, 删除, 编辑
- 边自带箭头, 支持标签显示

## TODO

- 给节点设置图标
- 添加 tool-tip
- 画布缩放时的拖拽兼容
- 解决拖拽时 null文字残留
- 拖拽画布后拖拽锚点虚线位置错误
- 节点多选(shift), 拖动框选节点
- 拖拽节点到画布边缘时自动滚动画布可见范围
- 高亮显示与该节点连接的节点
- 点击节点时将节点层级提升
- 三角形, 平行四边形节点
- 锚点禁用状态及相关交互
- 节点锁定及加锁状态
- 边标签的位置优化(直接继承line)
- 双击节点编辑标签
- 拖拽边高亮及时消失
- 边支持编辑箭头
- 边偶尔会被选中
- 边动态动画

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
      id: '1',
      label: 'node1', // 节点上显示的文字
      data: {
        // ... 其他属性
      },
      type: 'rect-node', // ellipse-node / circle-node / diamond-node
      style: {
        // ... 当前节点的样式
        r:   40, // 圆形节点半径
        hover: {
          fill: '#ccc',
        },
        selected: {
          stroke: '#ccc',
        },
        // node 文本默认样式
        nodeLabelStyles: {
          cursor:     'default',
          fill:     'red',
          textAlign:  'center',
          textBaseline: 'middle',
          fontSize:   16,
        },
      },
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
        // 当前边的样式
      },
    },
  ],
}

const g6 = new WelabxG6({
  container: 'id',
  width: 1000,
  height: 300,
  renderer: 'svg', // 默认 canvas
  // 自定义注册行为, 事件, 交互
  registerFactory: G6 => {
    console.log(G6);
  },
  // ... 其他G6参数
});

const graph = g6.instance; // G6实例
graph.read(data);
graph.paint();
// 销毁实例
g6.destroy();
```

### 事件监听与通知

```js
/* 已支持事件列表:
* after-node-selected
* after-edge-selected
* after-node-removed
* after-node-dblclick
* after-edge-dblclick
* before-node-removed
* before-edge-add
*/
graph.on('after-node-selected', node => {
  if(node) {
    console.log(node._cfg.id);
  }
});

graph.on('after-edge-selected', edge => {
  if(edge) {
    console.log(edge._cfg.id);
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

### 销毁实例

```js
graph.destroy();
```

### 添加节点/边

```js
const model = {
  label: 'node',
  id:  '1',
  // 形状
  type:  'rect-node', // e.target.dataset.shape
  // 坐标
  x:   e.clientX - 50,
  y:   e.clientY + 200,
};

graph.addItem('node', model);

graph.addItem('edge', {
  source: '1',
  label: 'edge',
});
```

## 运行案例

```ssh
npm install
npm run dev
// open 127.0.0.1:4300 in your browser
```

## 注意事项

> notes: 使用 cnpm 安装可能导致 import 路径报错, 建议使用npm或yarn
> 有问题请在GitHub上提issue, 目前版本还有大部分功能要完善, 欢迎star

## 更新日志

所有版本更新日志(仅列出重要的更新):

### [0.1.2] 20202-04-28

- 新增删除事件: after-node-removed 和 after-edge-removed
- 将 antv/g6 作为生产依赖

> notes: 使用 cnpm 安装可能导致 import 路径报错, 建议使用npm或yarn

### [0.1.3] 20202-04-29

- 按delete键删除节点支持确认回调, 默认不再直接删除
- 节点和边支持双击事件 after-node-dblclick / after-edge-dblclick, 弊端: 单击事件会被触发两次

### [0.1.8] 20202-04-30

- 优化 before-node-removed, 支持获取要删除的节点信息
- 拖拽锚点后不再自动添加边, 需在 before-edge-add 事件回调中自行添加
- *所有事件返回的节点都是 item 实例*
