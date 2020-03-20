/**
 * @param {string} shapeType 支持 rect/circel/path 等内置节点
 * @param {string} getShapeStyle 用于覆盖 base-node 默认样式
 * @param {string} icon 图片 url
 * @param {string} labelCfg 文本节点样式
 */
import defaultStyles from '../utils/defaultStyles';

const {
    iconStyles,
    nodeStyles,
    anchorPointStyles,
    nodeLabelStyles,
} = defaultStyles;

export default G6 => {
    // 从 base-node 中扩展方形节点
    G6.registerNode('rect-node', {
        shapeType: 'rect',
        // 当前节点默认样式
        options:   {
            icon: require('../assets/images/TB1_1680x370.png').default,
            iconStyles,
        },
        // 覆盖 base-node 默认样式
        getShapeStyle (cfg) {
            const width = cfg.style.width || 80;
            const height = cfg.style.height || 40;

            return {
                style: {
                    ...nodeStyles,
                    width,
                    height,
                    x:             0,
                    y:             0,
                    radius:        5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 2,
                    shadowColor:   '#ccc',
                    shadowBlur:    10,
                },
                anchorPointStyles,
                labelCfg: nodeLabelStyles,
            };
        },
        /* 获取锚点（相关边的连入点） */
        getAnchorPoints (cfg) {
            return [
                [1, 0.5],
                [0, 0.5],
            ];
        },
    }, 'base-node');

    // 扩展圆形节点
    G6.registerNode('circle-node', {
        shapeType: 'circle',
        getShapeStyle (cfg) {
            const radius = cfg.style.r || 50;

            return {
                style: {
                    ...nodeStyles,
                    width:  0,
                    height: 0,
                    x:      0,
                    y:      0,
                    r:      radius,
                },
                anchorPointStyles,
                labelCfg: nodeLabelStyles,
            };
        },
        getAnchorPoints (cfg) {
            return [
                [0.5, 0],
                [1, 0.5],
                [0.5, 1],
                [0, 0.5],
            ];
        },
    }, 'base-node');

    // 扩展三角形节点
    G6.registerNode('triangle-node', {
        shapeType: 'triangle',
        getShapeStyle (cfg) {
            const radius = cfg.style.r || 50;

            return {
                style: {
                    ...nodeStyles,
                    width:  0,
                    height: 0,
                    x:      0,
                    y:      0,
                    r:      radius,
                },
                anchorPointStyles,
                labelCfg: nodeLabelStyles,
            };
        },
        getAnchorPoints (cfg) {
            return [
                [0.5, 0],
                [0, 1],
                [1, 1],
            ];
        },
    }, 'base-node');
};
