/**
 * @param {string} shapeType 支持 rect/circel/path 等内置节点
 * @param {string} getShapeStyle 用于覆盖 base-node 默认样式
 * @param {string} icon 图片 url
 * @param {string} labelCfg 文本节点样式
 */
import defaultStyles from './defaultStyles';

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
            icon: require('../../../assets/images/TB1_1680x370.png').default,
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
                    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
                    x:             -width/2,
                    y:             -height/2,
                    radius:        5,
                    shadowOffsetX: 0,
                    shadowOffsetY: 2,
                    shadowColor:   '#ccc',
                    shadowBlur:    10,
                },
                anchorPointStyles,
                labelCfg: {
                    ...nodeLabelStyles,
                    ...cfg.style.nodeLabelStyles,
                },
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
            const r = cfg.style.r || 30;

            return {
                style: {
                    ...nodeStyles,
                    r, // 半径
                    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
                    x: 0,
                    y: 0,
                    ...cfg.style,
                },
                anchorPointStyles,
                labelCfg: {
                    ...nodeLabelStyles,
                    ...cfg.style.nodeLabelStyles,
                },
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

            return {
                style: {
                    ...nodeStyles,
                    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
                    x: 0,
                    y: 0,
                },
                anchorPointStyles,
                labelCfg: {
                    ...nodeLabelStyles,
                    ...cfg.style.nodeLabelStyles,
                },
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

    // 扩展椭圆形
    G6.registerNode('ellipse-node', {
        shapeType: 'ellipse',
        getShapeStyle (cfg) {

            return {
                size:  [130, 80],
                style: {
                    ...nodeStyles,
                    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
                    x: 0,
                    y: 0,
                },
                anchorPointStyles,
                labelCfg: {
                    ...nodeLabelStyles,
                    ...cfg.style.nodeLabelStyles,
                },
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

    // 扩展菱形
    G6.registerNode('diamond-node', {
        shapeType: 'diamond',
        getShapeStyle (cfg) {

            return {
                size:  ['100', '80'],
                style: {
                    ...nodeStyles,
                    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
                    x: 0,
                    y: 0,
                },
                anchorPointStyles,
                labelCfg: {
                    ...nodeLabelStyles,
                    ...cfg.style.nodeLabelStyles,
                },
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
