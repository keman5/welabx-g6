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
            @canvas-mouseup="drop"
        />
        <!-- 浮动工具条 -->
        <div id="toolbar">
            <i
                class="iconfont icon-undo"
                @click="addCircle"
            />
            <i
                class="iconfont icon-redo"
                @click="addCircle"
            />
            <i class="split" />
            <i
                class="iconfont icon-copy"
                @click="copyNode"
            />
            <i
                class="iconfont icon-paste"
                @click="addCircle"
            />
            <i class="split" />
            <i
                class="iconfont icon-line-style"
                @click="addCircle"
            />
            <i
                class="iconfont icon-line-strong"
                @click="addCircle"
            />
            <i class="split" />
            <i
                class="iconfont icon-toup"
                @click="addCircle"
            />
            <i
                class="iconfont icon-todown"
                @click="addCircle"
            />
            <i class="split" />
            <i
                class="iconfont icon-font-size"
                @click="addCircle"
            />
            <i
                class="iconfont icon-actual-size"
                @click="addCircle"
            />
            <i
                class="iconfont icon-full-screen"
                @click="addCircle"
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
                    // fitView:        true,
                    // fitViewPadding: 20,
                    animate:   true,
                    modes:     {
                        default: ['drag-canvas', 'zoom-canvas', 'clickSelected'],  // 允许拖拽画布、放缩画布、拖拽节点
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
                        // 鼠标点击节点，即 click 状态为 true 时的样式
                        click: {
                            stroke: '#000',
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

                // this.graph.read({});  // 读取 Step 2 中的数据源到图上

                this.initEvents();
            },
            // 初始化事件
            initEvents () {

                // 鼠标进入节点
                this.graph.on('node:mouseenter', e => {
                    const nodeItem = e.item;  // 获取鼠标进入的节点元素对象

                    this.graph.setItemState(nodeItem, 'hover', true);  // 设置当前节点的 hover 状态为 true
                });

                // 鼠标离开节点
                this.graph.on('node:mouseleave', e => {
                    const nodeItem = e.item;  // 获取鼠标离开的节点元素对象

                    this.graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
                });

                // 点击节点
                this.graph.on('node:click', e => {
                    // 先将所有当前是 click 状态的节点置为非 click 状态
                    const clickNodes = this.graph.findAllByState('node', 'click');

                    clickNodes.forEach(cn => {
                        this.graph.setItemState(cn, 'click', false);
                    });
                    const nodeItem = e.item;  // 获取被点击的节点元素对象

                    this.graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
                });

                // 点击边
                this.graph.on('edge:click', e => {
                    // 先将所有当前是 click 状态的边置为非 click 状态
                    const clickEdges = this.graph.findAllByState('edge', 'click');

                    clickEdges.forEach(ce => {
                        this.graph.setItemState(ce, 'click', false);
                    });
                    const edgeItem = e.item;  // 获取被点击的边元素对象

                    this.graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
                });

            },
            // 复制节点
            copyNode () {

            },
            // 粘贴节点
            paste () {

            },
            // 添加圆圈
            addCircle (e) {
                const model = {
                    label: 'node',
                    x:     e.clientX,
                    y:     e.clientY,
                    style: {
                        fill: '#fff',
                    },
                };

                this.graph.addItem('node', model);
            },
            // 拖放事件
            drop (e) {
                console.log(e);
                this.addCircle(e);
                const node = this.graph.findAll('node', node => {
                    return node.get('model').x;
                });

                console.log(node);

            },
        },
    };
</script>

<style lang="scss">
    @import "./app.scss";
</style>
