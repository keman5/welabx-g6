<template>
    <div class="root">
        <div
            id="headPanel"
            :class="{'hidden': headVisible}"
        >
            <span class="logo">logo</span>
            <i
                class="gb-toggle-btn"
                @click="headVisible = !headVisible"
            />
        </div>
        <!-- 左侧按钮 -->
        <item-panel
            :graph="graph"
            @canvas-dragend="addNode"
        />
        <!-- 浮动工具条 -->
        <div id="toolbar">
            <i
                class="iconfont icon-undo"
                @click="addNode"
            />
            <i
                class="iconfont icon-redo"
                @click="addNode"
            />
            <i class="split" />
            <i
                class="iconfont icon-copy"
                @click="copyNode"
            />
            <i
                class="iconfont icon-paste"
                @click="addNode"
            />
            <i class="split" />
            <i
                class="iconfont icon-line-style"
                @click="addNode"
            />
            <i
                class="iconfont icon-line-strong"
                @click="addNode"
            />
            <i class="split" />
            <i
                class="iconfont icon-toup"
                @click="addNode"
            />
            <i
                class="iconfont icon-todown"
                @click="addNode"
            />
            <i class="split" />
            <i
                class="iconfont icon-font-size"
                @click="addNode"
            />
            <i
                class="iconfont icon-actual-size"
                @click="addNode"
            />
            <i
                class="iconfont icon-full-screen"
                @click="addNode"
            />
        </div>
        <!-- 挂载节点 -->
        <div
            id="canvasPanel"
            @dragover.prevent=""
        />
        <!-- 配置面板 -->
        <div
            id="configPanel"
            :class="{'hidden': !configVisible}"
        >
            <h2 class="panel-title">数据配置</h2>
            <i
                class="gb-toggle-btn"
                @click="configVisible = !configVisible"
            />
        </div>
    </div>
</template>

<script>
    import G6 from '@antv/g6';
    import Grid from '@antv/g6/plugins/grid';
    import behavior from './behavior/index.js';
    import ItemPanel from './plugins/ItemPanel.vue';

    export default {
        components: {
            ItemPanel,
        },
        data () {
            return {
                graph:     {},
                highLight: {
                    undo: false,
                    redo: false,
                },
                // 保存线条样式
                lineStyle: {
                    type:  'line',
                    width: 1,
                },
                headVisible:   false,
                configVisible: false,
            };
        },
        mounted () {
            // 注册行为
            behavior(G6);
            // 创建画布
            this.createGraphic();
        },
        beforeDestroy () {
            this.graph.destroy();
        },
        methods: {
            createGraphic () {
                const { innerWidth, innerHeight } = window;
                // 背景网格
                const grid = new Grid();

                this.graph = new G6.Graph({
                    container: 'canvasPanel',         // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                    width:     innerWidth,   // Number，必须，图的宽度
                    height:    innerHeight,  // Number，必须，图的高度
                    fitView:   true,
                    // fitViewPadding: 20,
                    animate:   true,
                    modes:     {
                        // 允许拖拽画布、缩放画布、拖拽节点
                        default: ['drag-canvas', 'zoom-canvas', {
                            type:    'click-select',
                            trigger: 'ctrl',
                        }, 'click-selected', 'drag-node', 'anchor-active'],
                    },
                    /* defaultNode: {
                        shape: 'modelRect',
                    }, */
                    // 节点不同状态下的样式集合
                    nodeStateStyles: {
                        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                        hover: {
                            fill: '#eee',
                        },
                        // 鼠标点击节点，即 selected 状态为 true 时的样式
                        selected: {
                            stroke: '#000',
                        },
                    },
                    // 节点不同状态下的样式集合
                    edgeStateStyles: {
                        // 鼠标点击边，即 selected 状态为 true 时的样式
                        selected: {
                            stroke: 'steelblue',
                        },
                    },
                    plugins: [grid],
                });

            },
            // 复制节点
            copyNode () {

            },
            // 粘贴节点
            paste () {

            },
            // 添加节点
            addNode (e) {
                const model = {
                    label: 'node',
                    // 形状
                    shape: e.target.dataset.type,
                    // 坐标
                    x:     e.clientX,
                    y:     e.clientY,
                    // 默认样式
                    style: {
                        fill: '#fff',
                    },
                    // 可交互的位置
                    anchorPoints: [
                        [0, 0.5], // 左侧中间
                        [1, 0.5], // 右侧中间
                    ],
                };

                this.graph.addItem('node', model);
            },
        },
    };
</script>

<style lang="scss">
    @import "./app.scss";
</style>
