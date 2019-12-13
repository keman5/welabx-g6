<template>
    <div
        id="itemPanel"
        ref="itemPanel"
        :class="{'hidden': itemVisible}"
    >
        <i class="iconfont icon-h-drag" />
        <div class="icon-tool">
            <i
                draggable="true"
                data-type="circle"
                class="iconfont icon-circle"
                @click="addNode"
            />
            <i
                draggable="true"
                data-type="rect"
                class="iconfont icon-rect"
                @click="addNode"
            />
            <i
                draggable="true"
                data-type="ellipse"
                class="iconfont icon-ellipse"
                @click="addNode"
            />
            <i
                draggable="true"
                data-type="diamond"
                class="iconfont icon-diamond"
                @click="addNode"
            />
            <i class="split" />
            <i
                draggable="true"
                class="gb-toggle-btn"
                @click="itemVisible = !itemVisible"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name:  'ItemPanel',
        props: {
            graph: {
                type:    Object,
                default: () => { },
            },
        },
        data () {
            return {
                itemVisible: false,
            };
        },
        mounted () {
            const icons = [...this.$refs.itemPanel.querySelector('.icon-tool').querySelectorAll('.iconfont')];

            icons.forEach(icon => {
                // 拖拽结束
                icon.addEventListener('dragend', e => {
                    this.$emit('canvas-dragend', e);
                });
            });

            // 阻止默认动作
            document.addEventListener('drop', e => {
                e.preventDefault();
            }, false);
        },
        methods: {
            addNode ($event) {
                const { target } = $event;
                const classes = [...target.classList].join(' ');

                console.log(classes);

            },
        },
    };
</script>
