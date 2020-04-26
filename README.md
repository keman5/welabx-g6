# g6 流程图

- 自定义节点和边
- 已内置圆形和方形节点
- 节点支持拖拽连线, 删除, 编辑
- 边支持标签显示

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
                r:     40, // 圆形节点半径
                hover: {
                    fill: '#ccc',
                },
                selected: {
                    stroke: '#ccc',
                },
                // node 文本默认样式
                nodeLabelStyles: {
                    cursor:       'default',
                    fill:         'red',
                    textAlign:    'center',
                    textBaseline: 'middle',
                    fontSize:     16,
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
    // ... 其他G6参数
});

// 自定义注册行为, 事件, 交互
g6.registerFactory(G6 => {
    // G6: antv/G6 es6 版本原对象
    console.log(G6);
});

const graph = g6.instance; // G6实例
graph.read(data);
graph.paint();
```

### 事件监听与通知

```js
// 已支持事件: after-node-selected/after-edge-selected
graph.on('after-node-selected', data => {
    if(data) {
        console.log(data._cfg.id);
    }
});

graph.on('after-edge-selected', data => {
    if(data) {
        console.log(data._cfg.source);
    }
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
    id:    '1',
    // 形状
    type:  'rect-node', // e.target.dataset.shape
    // 坐标
    x:     e.clientX - 50,
    y:     e.clientY + 200,
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
