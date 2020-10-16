<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">脑图 (Tab新建节点, 回车输入和确定)</span>
    </div>
    <!-- 挂载节点 -->
    <div
      id="canvasPanel"
      @dragover.prevent
    />
    <input
      id="canvas-input"
      type="text"
    >
  </div>
</template>

<script>
import G6 from '../../components/graph/graph';

export default {
  data () {
    return {
      graph:        null,
      node:         null,
      inputEl:      null,
      canvasOffset: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted () {
    document.title = '脑图';
    // 创建画布
    this.$nextTick(() => {
      this.createGraphic();
      this.initGraphEvent();
      this.inputEl = document.getElementById('canvas-input');

      this.inputEl.addEventListener('blur', () => {
        this.inputEl.style.left = '-100em';
        this.inputEl.style.top = '-100em';
      });
    });
  },
  beforeDestroy () {
    this.graph.destroy();
  },
  methods: {
    createGraphic () {
      const data = {
        id:        'root',
        label:     'Root',
        // 边的样式
        edgeStyle: {
          stroke: '#999',
        },
        children: [{
          text:      'root-note', // 边对应的文案
          type:      'modelRect-node',
          edgeStyle: { // 节点样式
            stroke: '#39495b',
          },
          // 左侧方条
          preRect: {
            show:   true, // 是否显示左侧方条
            width:  4,
            fill:   '#40a9ff',
            radius: 2,
          },
          logoIcon: {
            show:   true, // 是否显示图标
            x:      -92,  // 控制图标在横轴上的位置
            y:      -8,   // 控制图标在纵轴上的位置
            img:    'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
            width:  16,
            height: 16,
          },
          // 状态图标, 注意: 坐标 (0, 0) 代表图形几何中心
          stateIcon: {
            show:       true,     // 是否显示图标
            x:          70,       // 控制图标在横轴上的位置
            y:          10,       // 控制图标在纵轴上的位置
            text:       '\ue610',
            fontFamily: 'iconfont',
            fontSize:   20,
            style:      {
              stroke: '#333',
              fill:   '#fc0',
            },
          },
          labels: [{
            x:        -70,
            y:        -10,
            label:    '标题,最长10个字符~~',
            labelCfg: {
              fill:      '#666',
              fontSize:  14,
              maxlength: 10,
            },
          }, {
            x:        -70,
            y:        7,
            label:    '描述,最长12个字符~~~',
            labelCfg: {
              fontSize:  12,
              fill:      '#999',
              maxlength: 12,
            },
          }, {
            x:        -70,
            y:        24,
            label:    '第三行,最长16个字符,超出显示省略号~~~',
            labelCfg: {
              fontSize:  10,
              fill:      '#ccc',
              maxlength: 16,
            },
          }],
          children: [{
            label:    '初始化事件和生命周期和其他',
            labelCfg: {
              stroke:    '#ccc',
              fill:      '#666',
              maxlength: 10,
            },
          }],
        }, {
          label:    '初始化事件和生命周期和其他',
          labelCfg: {
            stroke:    '#ccc',
            fill:      '#666',
            maxlength: 10,
          },
          // 状态图标, 注意: 坐标 (0, 0) 代表图形几何中心
          stateIcon: {
            show:       true,     // 是否显示图标
            x:          -96,      // 控制图标在横轴上的位置
            y:          14,       // 控制图标在纵轴上的位置
            text:       '\ue601',
            fontFamily: 'iconfont',
            fontSize:   30,
            style:      {
              stroke: '#999',
              fill:   '#fc0',
            },
          },
          children: [{
            label:    '初始化事件和生命周期和其他',
            labelCfg: {
              stroke:    '#ccc',
              fill:      '#666',
              maxlength: 10,
            },
          }],
        }],
      };

      for(let i = 0; i < 11; i++) {
        data.children.push({
          label:    '初始化事件和生命周期和其他',
          labelCfg: {
            stroke:    '#ccc',
            fill:      '#666',
            maxlength: 10,
          },
          children: [{
            label:    '初始化事件和生命周期和其他',
            labelCfg: {
              stroke:    '#ccc',
              fill:      '#666',
              maxlength: 10,
            },
          }],
        });
      }

      const graph = new G6({
        width:     window.innerWidth,
        height:    window.innerHeight - 40,
        fitCenter: true,
        layout:    {
          type:      'mindmap',
          direction: 'H', // H / V / LR / RL / TB / BT
          getWidth:  () => {
            return 200;
          },
          getVGap: () => {
            return 50;
          },
          getHGap: () => {
            return 50;
          },
        },
        modes: {
          default: ['zoom-canvas', 'drag-canvas', 'canvas-event', 'select-node'],
        },
        // renderer:    'svg',
        defaultNode: {
          type:     'modelRect-node',
          labelCfg: {
            fontSize: 20,
          },
          // 锚点控制字段
          anchorControls: {
            hide: true,
          },
        },
        defaultEdge: {
          type:  'hvh-h-edge', // 扩展了内置边, 有边的事件
          style: {
            radius:          5,
            offset:          15,
            lineWidth:       3,
            lineAppendWidth: 10, // 防止线太细没法点中
          },
        },
        // 覆盖全局样式
        nodeStateStyles: {
          'nodeState:default': {
            opacity: 1,
          },
          'nodeState:hover': {
            opacity: 0.8,
          },
          'nodeState:selected': {
            opacity: 0.9,
          },
        },
        // 默认边不同状态下的样式集合
        edgeStateStyles: {
          'edgeState:hover': {
            animate: false,
          },
        },
        // 自定义注册行为, 事件, 交互
        registerFactory: (G6, cfg) => {
          /* const minimap = new G6.Minimap({
            size: [200, 100],
          });

          cfg.plugins = [minimap]; */

          return new G6.TreeGraph(cfg);
        },
        // ... 其他G6原生入参
      });

      this.graph = graph.instance;
      this.graph.read(data);
      setTimeout(() => {
        this.graph.paint();
        this.graph.fitView();
      });
    },
    // 初始化图事件
    initGraphEvent () {
      this.graph.on('on-canvas-dragend', e => {
        this.canvasOffset.x = e.dx;
        this.canvasOffset.y = e.dy;
      });

      // 监听键盘事件
      this.graph.on('keydown', e => {
        switch (e.keyCode) {
          // tab
          case 9:
            this.tabEvent(e);
            break;
          // enter
          case 13:
            this.enterEvent(e);
            break;
        }
      });

      this.graph.on('after-node-selected', e => {
        if (e && e.item) {
          this.node = e.item;
        }
      });
      this.graph.on('canvas:mousedown', e => {
        if (e && e.item) {
          this.node = null;
        }
      });

      this.graph.on('after-node-dblclick', e => {
        if (e && e.item) {
          this.node = e.item;
          this.enterEvent(e);
        }
      });

      this.graph.on('before-edge-add', ({ source, target, sourceAnchor, targetAnchor }) => {
        setTimeout(() => {
          this.graph.addItem('edge', {
            source: source.get('id'),
            target: target.get('id'),
            sourceAnchor,
            targetAnchor,
          });
        }, 100);
      });
    },
    tabEvent(e) {
      console.log(e);
    },
    enterEvent(e) {
      if(this.node) {
        if(this.node._cfg.keyShape.cfg) {
          const { keyShape: { cfg: { cacheCanvasBBox: { x, y, width, height } } }, model: { label } } = this.node._cfg;

          this.inputEl.style.width = `${width}px`;
          this.inputEl.style.height = `${height}px`;
          this.inputEl.style.left = `${x}px`;
          this.inputEl.style.top = `${y+40}px`;
          this.inputEl.value = label;
          this.inputEl.focus();
        }
      }
    },
  },
};
</script>

<style lang="scss">
  #canvasPanel{left:0;}
  #canvas-input{
    position: absolute;
    top: 100em;
    left: 100em;
    z-index: 100;
    border:1px solid #ccc;
  }
</style>
