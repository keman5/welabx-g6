/**
 * @author claude
 * @description 所有元素的默认样式
 */

export default {
    // node默认样式
    nodeStyles: {
        cursor:    'default',
        fill:      '#E7F7FE',
        stroke:    '#1890FF',
        lineWidth: 1,
    },
    // node 交互样式
    nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
            cursor:        'pointer',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur:    10,
            opacity:       0.8,
        },
        // 鼠标点击节点，即 selected 状态为 true 时的样式
        selected: {
            fill:   '#f9f9f9',
            stroke: '#1890FF',
            cursor: 'default',
        },
    },
    // node 文本默认样式
    nodeLabelStyles: {
        cursor:       'default',
        fill:         '#666',
        textAlign:    'center',
        textBaseline: 'middle',
        fontSize:     12,
    },
    // node 文本交互样式
    nodeLabelStateStyles: {
        hover: {

        },
        selected: {

        },
    },
    /* node图标默认样式 */
    iconStyles: {
        width:  20,
        height: 20,
        left:   0,
        top:    0,
    },
    // edge默认样式
    edgeStyles: {
        stroke:          '#aab7c3',
        lineAppendWidth: 10,
        startArrow:      {
            path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
            fill: '#aab7c3',
        },
        endArrow: {
            path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
            fill: '#aab7c3',
        },
    },
    // edge交互样式
    edgeStateStyles: {
        // 鼠标点击边，即 selected 状态为 true 时的样式
        selected: {
            stroke: 'steelblue',
        },
        hover: {
            fill: 'steelblue',
        },
    },
    anchorHotsoptStyle: {
        radius:      11,
        fill:        '#1890FF',
        fillOpacity: 0.25,
    },
    anchorPointStyles: {
        r:         4,
        fill:      '#fff',
        stroke:    '#1890FF',
        lineWidth: 1,
    },
    anchorPointStateStyles: {
        r:           4,
        stroke:      '#1890FF',
        fill:        '#1890FF',
        fillOpacity: 1,
    },
};
