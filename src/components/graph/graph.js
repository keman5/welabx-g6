/**
 * g6 流程图构造器
 * 将G6封装后返回
 */

import G6ES from '@antv/g6/es/index';
import registerFactory from './register-factory';

class G6 {
  constructor(config = {}) {
    // 注册插件等
    config.beforeInit && config.beforeInit(config, G6ES);

    // 内部注册组件, 行为, 事件等
    registerFactory(G6ES);

    // 外部自定义行为/事件等
    config.registerFactory && config.registerFactory(G6ES, config);

    this.init(config);
  }

  init (config) {
    const options = Object.assign({
      container:      'canvasPanel',
      width:          window.innerWidth,
      height:         window.innerHeight,
      // renderer:       'svg',
      fitViewPadding: 20,
      animate:        true,
      animateCfg:     {
        duration: 500,
        easing:   'linearEasing',
      },
      layout: {
        type:    'dagre',
        // rankdir: 'LR',
        nodesep: 30,
        ranksep: 30,
      },
      modes: {
        // 允许拖拽画布、缩放画布、拖拽节点
        default: [
          'drag-canvas',
          // 'zoom-canvas',
          /* {
              type:    'click-select',
              trigger: 'ctrl',
          }, */
          /* {
              type:           'drag-node',
              enableDelegate: true,
          }, */
          // 'activate-relations',
          'canvas-event',
          'delete-item',
          'select-node',
          'hover-node',
          'drag-node',
          'active-edge',
        ],
      },
      // linkCenter:  true,
      defaultNode: {
        type:  'rect-node',
        style: {
          radius: 10,
        },
      },
      defaultEdge: {
        type:  'polyline-edge', // polyline
        style: {
          radius:          6,
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
    }, config);

    if (config.plugins && config.plugins.length) {
      options.plugins = config.plugins;
    }

    this.instance = new G6ES.Graph(options);

    const { el } = this.instance.cfg.canvas.cfg;

    el.id = `${options.container}-canvas`;
    el.setAttribute('dx', 0);
    el.setAttribute('dy', 0);

    document.addEventListener('click', e => {
      // 内部键盘事件是否可被触发
     el.setAttribute('isFocused', e.target.id === el.id);
    });
  }

  // 销毁实例
  destroy () {
    this.instance.destroy();
    this.instance = null;
  }
}

export default G6;
