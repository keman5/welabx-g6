/**
 * g6 流程图构造器
 * 将G6封装后返回
 */

import registerFactory from './register-factory';

export default (G6, config) => {
  const options = Object.assign({
    container:      'canvasPanel',
    width:          window.innerWidth,
    height:         window.innerHeight,
    // renderer:       'svg',
    fitViewPadding: 20,
    animate:        true,
    animateCfg:     {
      duration: 500,
      easing:   'easeLinear',
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
        'drag-canvas', // 官方内置的行为
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
        'canvas-event', // 自定义行为
        'delete-item',
        'select-node',
        'hover-node',
        'drag-shadow-node',
        'active-edge',
      ],
    },
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
          path:   'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
          fill:   '#aab7c3',
          stroke: '#aab7c3',
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
        stroke:   '#aab7c3',
        endArrow: {
          path:   'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
          fill:   '#aab7c3',
          stroke: '#aab7c3',
        },
      },
      'edgeState:selected': {
        stroke: '#1890FF',
      },
      'edgeState:hover': {
        stroke: '#1890FF',
      },
    },
  }, config);

  const el = typeof options.container === 'string' ? document.getElementById(options.container) : options.container;

  if (el) {
    setTimeout(() => {
      for (let i = 0; i < el.children.length; i++) {
        const dom = el.children[i];

        if (dom.nodeName === 'CANVAS') {
          dom.$id = `${options.container}-canvas`;

          /* 监听键盘事件 */
          document.addEventListener('click', e => {
            // 内部键盘事件是否可被触发
            dom.setAttribute('isFocused', e.target.$id === dom.$id);
          });
          break;
        }
      }
    });

    // 注册自定义节点/边等
    registerFactory(G6);
  } else {
    console.warn('未找到注册节点!');
  }

  return options;
};
