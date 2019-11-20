<template>
    <div
        id="mountNode"
        class="root"
    />
</template>

<script>
    import G6 from '@antv/g6';
    import Grid from '@antv/g6/plugins/grid';
    import dataset from './dataset.json';

    export default {
        data () {
            return {

            };
        },
        mounted () {
            // 实例化 grid 插件
            const grid = new Grid();

            const graph = new G6.Graph({
                container: 'mountNode',         // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                width:     window.innerWidth,   // Number，必须，图的宽度
                height:    window.innerHeight,  // Number，必须，图的高度
                // fitView:        true,
                // fitViewPadding: 20,
                animate:   true,
                modes:     {
                    default: ['drag-canvas', 'zoom-canvas', 'drag-node', {
                        type: 'tooltip', // 提示框
                        formatText (model) {
                            // 提示框文本内容
                            const text =
                                'label: ' + model.label + '<br/> class: ' + model.class;

                            return text;
                        },
                    }],  // 允许拖拽画布、放缩画布、拖拽节点
                },
                // 节点不同状态下的样式集合
                nodeStateStyles: {
                    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                    hover: {
                        fill: '#000',
                    },
                    // 鼠标点击节点，即 click 状态为 true 时的样式
                    click: {
                        stroke:    '#000',
                        lineWidth: 3,
                    },
                },
                // 节点不同状态下的样式集合
                edgeStateStyles: {
                    // 鼠标点击边，即 click 状态为 true 时的样式
                    click: {
                        stroke: 'steelblue',
                    },
                },
                plugins: [grid],
            });

            graph.read(dataset);  // 读取 Step 2 中的数据源到图上

            // 鼠标进入节点
            graph.on('node:mouseenter', e => {
                const nodeItem = e.item;  // 获取鼠标进入的节点元素对象

                graph.setItemState(nodeItem, 'hover', true);  // 设置当前节点的 hover 状态为 true
            });

            // 鼠标离开节点
            graph.on('node:mouseleave', e => {
                const nodeItem = e.item;  // 获取鼠标离开的节点元素对象

                graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
            });

            // 点击节点
            graph.on('node:click', e => {
                // 先将所有当前是 click 状态的节点置为非 click 状态
                const clickNodes = graph.findAllByState('node', 'click');

                clickNodes.forEach(cn => {
                    graph.setItemState(cn, 'click', false);
                });
                const nodeItem = e.item;  // 获取被点击的节点元素对象

                graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
            });

            // 点击边
            graph.on('edge:click', e => {
                // 先将所有当前是 click 状态的边置为非 click 状态
                const clickEdges = graph.findAllByState('edge', 'click');

                clickEdges.forEach(ce => {
                    graph.setItemState(ce, 'click', false);
                });
                const edgeItem = e.item;  // 获取被点击的边元素对象

                graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
            });

            // 2000 ms 后切换为允许节点重叠的 force 布局
            setTimeout(() => {
                graph.updateLayout({
                    type:           'force',
                    preventOverlap: true,
                    // nodeSize:       10,
                    linkDistance:   120,
                });   // 参数为 String 代表布局名称
            }, 2000);
        },
    };
</script>

<style lang="scss">
    @import "./app.scss";
</style>
