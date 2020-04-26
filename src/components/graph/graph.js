/**
 * g6 流程图构造器
 * 将G6封装后返回
 */

import G6ES from '@antv/g6/es/index';
import registerFactory from './register-factory';

class G6 {
    constructor(config = {}) {
        let grid = null;
        const plugins = [];

        if (config.grid) {
            // 背景网格
            grid = new G6ES.Grid();
            plugins.push(grid);
        }

        // 注册组件, 行为, 事件等
        registerFactory(G6ES);
        // 用户自定义行为, 事件等
        this.registerFactory();

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
                type: 'base-edge', // base-edge polyline
            },
            // 节点不同状态下的样式集合
            nodeStateStyles: {
                hover: {
                    fill: '#eee',
                },
                selected: {
                    stroke: '#1890FF',
                },
            },
            // 节点不同状态下的样式集合
            edgeStateStyles: {
                selected: {
                    stroke: 'steelblue',
                },
                hover: {
                    fill: 'steelblue',
                },
            },
        }, config);

        if (plugins.length) {
            options.plugins = plugins;
        }

        this.instance = new G6ES.Graph(options);
    }

    // 注册外部行为等
    registerFactory (register) {
        register && register(G6ES);
    }

    // 销毁实例
    destroy () {
        this.instance.destroy();
    }
}

export default G6;
