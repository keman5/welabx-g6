<template>
  <div class="root">
    <div
      id="headPanel"
      :class="{ hidden: headVisible }"
    >
      <span class="logo">Vue 生命周期图示</span>
      <button
        style="background:#1890FF;color:#fff;border-radius:5px;margin-left:10px;cursor:pointer;"
        @click="changeMode"
      >
        切换拖拽模式 ({{ mode }})
      </button>
      <router-link
        :to="{ path: '/tree' }"
        style="float:right; text-decoration:underline; color:#1890FF; font-size: 16px;"
      >
        脑图
      </router-link>
      <i
        class="gb-toggle-btn"
        @click="headVisible = !headVisible"
      />
    </div>
    <!-- 左侧按钮 -->
    <item-panel />

    <!-- 挂载节点 -->
    <div
      id="canvasPanel"
      ref="canvasPanel"
      @dragover.prevent
    />

    <!-- 配置面板 -->
    <div
      id="configPanel"
      :class="{ hidden: !configVisible }"
    >
      <i
        class="gb-toggle-btn"
        @click="configVisible = !configVisible"
      />
      <h2 class="panel-title">数据配置</h2>
      <div class="config-data">
        id: {{ config.id }}, data: {{ config.data }}
      </div>
      <h2 class="panel-title">节点样式配置</h2>
      <div class="config-data">
        <div class="config-item">
          形状: <select>
            <option
              v-for="(item, index) in nodeShapes"
              :key="index"
              :value="item.shape"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="config-item">
          背景色: <input :value="node.fill">
        </div>
        <div class="config-item">
          边框虚线: <input :value="node.lineDash">
        </div>
        <div class="config-item">
          边框颜色: <input :value="node.borderColor">
        </div>
        <div class="config-item">
          宽: <input :value="node.width">px
        </div>
        <div class="config-item">
          高: <input :value="node.height">px
        </div>
      </div>
      <h2 class="panel-title">文字样式配置</h2>
      <div class="config-data">
        <div class="config-item">
          文字: <input :value="label">
        </div>
        <div class="config-item">
          字体大小: <input :value="labelCfg.fontSize">
        </div>
        <div class="config-item">
          颜色: <input :value="labelCfg.style.fill">
        </div>
      </div>
      <button @click="configVisible = false">取消</button>
      <button
        class="save"
        @click="save"
      >
        保存
      </button>
    </div>
    <div
      v-if="tooltip"
      class="g6-tooltip"
      :style="`top: ${top}px; left: ${left}px;`"
    >
      id: {{ tooltip }}
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import registerFactory from '../../components/graph/graph';
import ItemPanel from './ItemPanel.vue';
import data from './data.js';

export default {
  components: {
    ItemPanel,
  },
  data () {
    return {
      mode:      'drag-shadow-node',
      graph:     {},
      highLight: {
        undo: false,
        redo: false,
      },
      // 保存线条样式
      lineStyle: {
        type:  'line',
        width: 1,
      },
      label:    '',
      labelCfg: {
        fontSize: 12,
        style:    {
          fill: '#fff',
        },
      },
      node: {
        fill:        '',
        lineDash:    'none',
        borderColor: '',
        width:       160,
        height:      60,
        shape:       'rect-node',
      },
      nodeShapes: [
        {
          name:  '矩形',
          shape: 'rect-node',
        },
        {
          name:  '圆形',
          shape: 'circle-node',
        },
        {
          name:  '椭圆',
          shape: 'ellipise-node',
        },
        {
          name:  '菱形',
          shape: 'diamond-node',
        },
      ],
      headVisible:   false,
      configVisible: false,
      config:        '',
      tooltip:       '',
      top:           0,
      left:          0,
    };
  },
  mounted () {
    // 创建画布
    this.$nextTick(() => {
      this.createGraphic();
      this.initGraphEvent();
    });
  },
  beforeDestroy () {
    this.graph.destroy();
  },
  methods: {
    createGraphic () {
      const vm = this;
      const grid = new G6.Grid();
      const menu = new G6.Menu({
          offsetX:   -20,
          offsetY:   -50,
          itemTypes: ['node'],
          getContent(e) {
              const outDiv = document.createElement('div');

              outDiv.style.width = '80px';
              outDiv.style.cursor = 'pointer';
              outDiv.innerHTML = '<p id="deleteNode">删除节点</p>';
              return outDiv;
          },
          handleMenuClick(target, item) {
              const { id } = target;

              if(id) {
                  vm[id](item);
              }
          },
      });
      const minimap = new G6.Minimap({
          size: [200, 100],
      });
      const cfg = registerFactory(G6, {
        width:  window.innerWidth,
        height: window.innerHeight,
        // renderer: 'svg',
        layout: {
          type: 'xxx', // 位置将固定
        },
        // 所有节点默认配置
        defaultNode: {
          type:  'rect-node',
          style: {
            radius: 10,
            width:  100,
            height: 50,
            cursor: 'move',
            fill:   '#ecf3ff',
          },
          labelCfg: {
            fontSize: 20,
            style:    {
              cursor: 'move',
            },
          },
        },
        // 所有边的默认配置
        defaultEdge: {
          type:  'polyline-edge', // 扩展了内置边, 有边的事件
          style: {
            radius:          5,
            offset:          15,
            stroke:          '#aab7c3',
            lineAppendWidth: 10, // 防止线太细没法点中
            endArrow:        true,
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
          'edgeState:default': {
            stroke: '#aab7c3',
          },
          'edgeState:selected': {
            stroke: '#1890FF',
          },
          'edgeState:hover': {
            animate:       true,
            animationType: 'dash',
            stroke:        '#1890FF',
          },
        },
        modes: {
          // 支持的 behavior
          default:    ['drag-canvas', 'drag-shadow-node', 'canvas-event', 'delete-item', 'select-node', 'hover-node', 'active-edge'],
          originDrag: ['drag-canvas', 'drag-node', 'canvas-event', 'delete-item', 'select-node', 'hover-node', 'active-edge'],
        },
        plugins: [menu, minimap, grid],
        // ... 其他G6原生入参
      });

      this.graph = new G6.Graph(cfg);
      this.graph.read(data); // 读取数据
      // this.graph.paint(); // 渲染到页面
      // this.graph.get('canvas').set('localRefresh', false); // 关闭局部渲染
      // this.graph.fitView();
    },
    // 初始化图事件
    initGraphEvent () {
      this.graph.on('drop', e => {
        const { originalEvent } = e;

        if(originalEvent.dataTransfer) {
          const transferData = originalEvent.dataTransfer.getData('dragComponent');

          if(transferData) {
            this.addNode(transferData, e);
          }
        }
      });

      this.graph.on('after-node-selected', e => {
        this.configVisible = !!e;

        if (e && e.item) {
          const model = e.item.get('model');

          this.config = model;
          this.label = model.label;
          this.labelCfg = {
            fontSize: model.labelCfg.fontSize,
            style:    {
              fill: model.labelCfg.style.fill,
            },
          };
          this.node = {
            fill:        model.style.fill,
            borderColor: model.style.stroke,
            lineDash:    model.style.lineDash || 'none',
            width:       model.style.width,
            height:      model.style.height,
            shape:       model.type,
          };
        }
      });

      this.graph.on('after-edge-selected', e => {
        this.configVisible = !!e;

        if (e && e.item) {
          this.config = e.item.get('model').id;

          this.graph.updateItem(e.item, {
            // shape: 'line-edge',
            style: {
              radius:    10,
              lineWidth: 2,
            },
          });
        }
      });

      this.graph.on('on-edge-mousemove', e => {
        if (e && e.item) {
          this.tooltip = e.item.get('model').label;
          this.left = e.clientX + 40;
          this.top = e.clientY - 20;
        }
      });

      this.graph.on('on-node-mousemove', e => {
        if (e && e.item) {
          this.tooltip = e.item.get('model').id;
          this.left = e.clientX + 40;
          this.top = e.clientY - 20;
        }
      });

      this.graph.on('on-node-mouseleave', e => {
        if (e && e.item) {
          this.tooltip = '';
        }
      });

      this.graph.on('on-edge-mouseleave', e => {
        if (e && e.item) {
          this.tooltip = '';
        }
      });

      this.graph.on('before-node-removed', ({ target, callback }) => {
        console.log(target);
        setTimeout(() => {
          // 确认提示
          callback(true);
        }, 1000);
      });

      this.graph.on('after-node-dblclick', e => {
        if (e && e.item) {
          console.log(e.item);
        }
      });

      this.graph.on('before-edge-add', ({ source, target, sourceAnchor, targetAnchor }) => {
        setTimeout(() => {
          this.graph.addItem('edge', {
            id:     `${+new Date() + (Math.random()*10000).toFixed(0)}`, // edge id
            source: source.get('id'),
            target: target.get('id'),
            sourceAnchor,
            targetAnchor,
            // label:  'edge label',
          });
        }, 100);
      });
    },
    changeMode () {
      if (this.mode === 'drag-node') {
        this.mode = 'drag-shadow-node';
        this.graph.setMode('default');
      } else {
        this.mode = 'drag-node';
        this.graph.setMode('originDrag');
      }
    },
    deleteNode(item) {
      this.graph.removeItem(item);
    },
    // 添加节点
    addNode (transferData, { x, y }) {
      const { label, shape, fill } = JSON.parse(transferData);

      const model = {
        label,
        // id:  Util.uniqueId(),
        // 形状
        type:  shape,
        style: {
          fill: fill || '#ecf3ff',
        },
        // 坐标
        x,
        y,
      };

      this.graph.addItem('node', model);
    },
    save() {
      // eslint-disable-next-line no-alert
      window.alert('我觉得就算我不写你也会了');
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
    background:#fff;
  }
</style>
