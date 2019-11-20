<template>
  <div class="root">
    <div id="headPanel">
      <span class="logo">G6 入门教程</span>
      <i class="gb-toggle-btn"/>
    </div>
    <!-- 左侧按钮 -->
    <item-panel
      :graph="graph"
      @canvas-add-node="addNode"
    />
    <div
      id="canvasPanel"
      @dragover.prevent
    />
  </div>
</template>

<script>
import ItemPanel from './ItemPanel.vue';
import data from './data.js';

export default {
  components: {
    ItemPanel,
  },
  data () {
    return {
      graph:     {},
      label:    '',
      labelCfg: {
        fontSize: 12,
        fill:     '#fff',
      },
      node: {
        fill:        '',
        lineDash:    'none',
        borderColor: '',
        width:       160,
        height:      60,
        shape:       'rect',
      },
      nodeShapes: [
        {
          name:  '矩形',
          shape: 'rect',
        },
        {
          name:  '圆形',
          shape: 'circle',
        },
        {
          name:  '椭圆',
          shape: 'ellipise',
        },
        {
          name:  '菱形',
          shape: 'diamond',
        },
      ],
      canvasOffset:  {
        x: 0,
        y: 0,
      },
    };
  },
  mounted () {
    // 创建画布
    this.$nextTick(() => {
      this.createGraphic();
    });
  },
  beforeDestroy () {
    this.graph.destroy();
  },
  methods: {
    createGraphic () {
      const vm = this;
      const graph = new G6({
        width:  window.innerWidth - 40,
        height: window.innerHeight - 40,
        // renderer: 'svg',
        layout: {
          type: 'xxx', // 位置将固定
        },
        defaultNode: {
          type:  'rect-node',
          style: {
            radius: 10,
          },
          labelCfg: {
            fontSize: 20,
          },
        },
      });

      this.graph = graph;
      this.graph.read(data); // 读取数据
    },
    deleteNode(item) {
      this.graph.removeItem(item);
    },
    // 添加节点
    addNode (e) {
      const model = {
        text: 'node',
        // 形状
        type: e.target.dataset.shape,
        // 坐标
        x:    e.clientX - this.canvasOffset.x - 50,
        y:    e.clientY - this.canvasOffset.y - 40,
      };

      this.graph.addItem('node', model);
    },
  },
};
</script>

<style lang="scss">
  /* 提示框的样式 */
  .g6-tooltip {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #545454;
    border-radius: 4px;
    border: 1px solid #e2e2e2;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgb(174, 174, 174) 0 0 10px;
    padding: 10px 8px;
  }
  .g6-minimap{
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
