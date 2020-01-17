export default {
    nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
            fill: '#eee',
        },
        // 鼠标点击节点，即 selected 状态为 true 时的样式
        selected: {
            stroke: '#1890FF',
        },
    },
    edgeStateStyles: {
        // 鼠标点击边，即 selected 状态为 true 时的样式
        selected: {
            stroke: 'steelblue',
        },
        hover: {
            fill: 'steelblue',
        },
    },
    archorStateStyle: {
        anchorPointHoverStyle: { radius: 4, fill: '#1890FF', fillOpacity: 1, stroke: '#1890FF' },
        anchorPointStyle:      { radius: 3.5, fill: '#fff', stroke: '#1890FF', lineAppendWidth: 12 },
    },
};
