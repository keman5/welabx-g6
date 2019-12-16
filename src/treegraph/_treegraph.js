import G6 from '@antv/g6';
import Grid from '@antv/g6/build/grid';
import Minimap from '@antv/g6/build/minimap';

export default {
    data () {
        return {
            width:  document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            graph:  null,
            data:   {
                id:       'Root',
                name:     'Root',
                x:        100,
                y:        100,
                children: [{
                    id:       'subTree1',
                    name:     'subTree1',
                    children: [{
                        id:       'node1-1',
                        name:     '撒旦法阿斯蒂芬礼金卡撒旦法阿斯蒂',
                        children: [{
                            id:       'node1-1-1',
                            name:     '阿斯顿发生的纠纷',
                            children: [],
                        }],
                    }, {
                        id:       'node1-2',
                        name:     'node1-2',
                        children: [],
                    }, {
                        id:       'node1-3',
                        name:     'node1-3',
                        children: [],
                    }, {
                        id:       'node1-4',
                        name:     'node1-4',
                        children: [],
                    }],
                },
                {
                    id:       'subTree2',
                    name:     'subTree2',
                    children: [{
                        id:   'node2',
                        name: 'node2-1asdfasdfasdfasdf',
                    }, {
                        id:   'node2-2',
                        name: 'node2-2asdfasdfasdfasdf',
                    }, {
                        id:   'node2-3',
                        name: 'node3-2asdfasdfasdfasdf',
                    }],
                },
                {
                    id:       'subTree3',
                    name:     'subTree3',
                    children: [],
                },
                ],
            },
            COLLAPSE_ICON: function COLLAPSE_ICON (x, y, r) {
                return [
                    ['M', x, y],
                    ['a', r, r, 0, 1, 0, r * 2, 0],
                    ['a', r, r, 0, 1, 0, -r * 2, 0],
                    ['M', x + 2, y],
                    ['L', x + 2 * r - 2, y],
                ];
            },
            EXPAND_ICON: function EXPAND_ICON (x, y, r) {
                return [
                    ['M', x, y],
                    ['a', r, r, 0, 1, 0, r * 2, 0],
                    ['a', r, r, 0, 1, 0, -r * 2, 0],
                    ['M', x + 2, y],
                    ['L', x + 2 * r - 2, y],
                    ['M', x + r, y - r + 2],
                    ['L', x + r, y + r - 2],
                ];
            },
        };
    },
    created () {
        const that = this;

        G6.registerNode('tree-node', {
            drawShape: function drawShape (cfg, group) {
                const rect = group.addShape('rect', {
                    attrs: {
                        fill:   '#fff',
                        stroke: '#666',
                        radius: 3,
                    },
                });
                const content = cfg.name.replace(/(.{19})/g, '$1\n');
                const text = group.addShape('text', {
                    attrs: {
                        text:         that.fittingString(content, 70, 12),
                        x:            0,
                        y:            0,
                        textAlign:    'left',
                        textBaseline: 'middle',
                        fill:         '#666',
                    },
                });
                const bbox = text.getBBox();

                rect.attr({
                    x:      bbox.minX - 4,
                    y:      bbox.minY - 6,
                    width:  120,
                    height: bbox.height + 12,
                });
                return rect;
            },
        }, 'single-shape');
    },
    mounted () {
        this.$nextTick(() => {
            // this.init();
            fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
                .then(res => res.json())
                .then(data => {
                    const width = document.getElementById('graph-container').scrollWidth;
                    const height = document.getElementById('graph-container').scrollHeight || 500;
                    const graph = new G6.TreeGraph({
                        container:  'graph-container',
                        width,
                        height,
                        pixelRatio: 2,
                        modes:      {
                            default: [{
                                type:     'collapse-expand',
                                onChange: function onChange (item, collapsed) {
                                    const data = item.get('model').data;

                                    data.collapsed = collapsed;
                                    return true;
                                },
                            }, 'drag-canvas', 'zoom-canvas'],
                        },
                        defaultNode: {
                            size:         26,
                            anchorPoints: [[0, 0.5], [1, 0.5]],
                            style:        {
                                fill:   '#C6E5FF',
                                stroke: '#5B8FF9',
                            },
                        },
                        defaultEdge: {
                            shape: 'cubic-horizontal',
                            style: {
                                stroke: '#A3B1BF',
                            },
                        },
                        layout: {
                            type:      'compactBox',
                            direction: 'LR',
                            getId:     function getId (d) {
                                return d.id;
                            },
                            getHeight: function getHeight () {
                                return 16;
                            },
                            getWidth: function getWidth () {
                                return 16;
                            },
                            getVGap: function getVGap () {
                                return 10;
                            },
                            getHGap: function getHGap () {
                                return 100;
                            },
                        },
                    });

                    graph.node(function (node) {
                        return {
                            label:    node.id,
                            labelCfg: {
                                offset:   10,
                                position: node.children && node.children.length > 0 ? 'left' : 'right',
                            },
                        };
                    });

                    graph.read(data);
                    graph.fitView();
                });
        });
    },
    methods: {
        init () {
            const height = this.height;
            const width = this.width;
            const minimap = new Minimap({ container: 'minimap' });
            const grid = new Grid(); //网格

            grid.forceAlign = true;
            this.graph = new G6.TreeGraph({
                container: 'graph-container',
                // fitView:   true,
                height,
                width,
                modes:     {
                    // 支持的 behavior
                    default: [
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    shape:        'tree-node',
                    anchorPoints: [
                        [0, 0.5],
                        [1, 0.5],
                    ],
                },
                defaultEdge: {
                    shape: 'polyline',
                    style: {
                        stroke: '#A3B1BF',
                        offset: 20,
                    },
                },
                layout: {
                    type:      'compactBox',
                    direction: 'LR',
                    rankdir:   'LR',
                    center:    [500, 300],
                    // 定制节点 id
                    getId:     function getId (d) {
                        return d.id;
                    },
                    // 指定当前节点高度
                    getHeight: function getHeight () {
                        return 16;
                    },
                    // 指定当前节点宽度
                    getWidth: function getWidth () {
                        return 16;
                    },
                    // 指定当前节点的垂直间距
                    getVGap: function getVGap () {
                        return 20;
                    },
                    // 指定当前节点的水平间距
                    getHGap: function getHGap () {
                        return 80;
                    },
                },
                plugins: [minimap, grid],
            });
            this.readData();
        },
        readData () {
            const data = this.data;

            if (data) {
                this.graph.read(data);
            }
        },
        /**
         * 计算显示的字符串
         * @param {string} str 要裁剪的字符串
         * @param {number} maxWidth 最大宽度
         * @param {number} fontSize 字体大小
         * @return {string} 处理后的字符串
         */
        fittingString (str, maxWidth, fontSize) {
            const fontWidth = fontSize * 1.3; // 字号+边距

            maxWidth = maxWidth * 2; // 需要根据自己项目调整
            const width = this.calcStrLen(str) * fontWidth;
            const ellipsis = '…';

            if (width > maxWidth) {
                const actualLen = Math.floor((maxWidth - 10) / fontWidth);
                const result = str.substring(0, actualLen) + ellipsis;

                return result;
            }
            return str;
        },
        /**
         * 计算字符串的长度
         * @param {string} str 指定的字符串
         * @return {number} 字符串长度
         */
        calcStrLen (str) {
            let len = 0;

            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
                    len++;
                } else {
                    len += 2;
                }
            }
            return len;
        },
    },
};
