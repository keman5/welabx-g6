/**
 * g6 流程图构造器
 * 将G6封装后返回
 */

import G6ES from '@antv/g6/es/index';
import registerFactory from './register-factory';

class G6 {
  constructor(config = {}) {
    // 内部注册组件, 行为, 事件等
    registerFactory(G6ES);

    // 外部自定义行为/事件等
    config.registerFactory && config.registerFactory(G6ES);

    this.init(config);
  }

  init (config) {
    const options = Object.assign({
      container:      'canvasPanel',
      width:          window.innerWidth - 100,
      height:         window.innerHeight - 40,
      // renderer:       'svg',
      fitViewPadding: 20,
      animate:        true,
      layout:         {
        type:    'dagre',
        // rankdir: 'LR',
        nodesep: 30,
        ranksep: 50,
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
          'delete-item',
          'select-node',
          'hover-node',
          'drag-node',
          'active-edge',
        ],
      },
      defaultNode: {
        type: 'circle-node',
      },
      defaultEdge: {
        type:  'polyline-edge', // polyline
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
        hover: {
          fill: '#eee',
        },
        selected: {
          stroke: '#1890FF',
        },
      },
      // 默认边不同状态下的样式集合
      edgeStateStyles: {
        selected: {
          stroke: 'steelblue',
        },
        hover: {
          fill: 'steelblue',
        },
      },
    }, config);

    if (config.plugins && config.plugins.length) {
      options.plugins = config.plugins;
    }

    this.instance = new G6ES.Graph(options);
  }

  // 销毁实例
  destroy () {
    this.instance.destroy();
    this.instance = null;
  }
}

export default G6;
