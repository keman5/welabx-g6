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
                class="iconfont icon-circle"
                @click="addCircle"
            />
            <i
                draggable="true"
                class="iconfont icon-rect"
                @click="addCircle"
            />
            <i
                draggable="true"
                class="iconfont icon-ellipse"
                @click="addCircle"
            />
            <i
                draggable="true"
                class="iconfont icon-diamond"
                @click="addCircle"
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
                    // e.dataTransfer.setData('Text', e.target);
                    this.$emit('canvas-mouseup', e);
                });
            });

            // 阻止默认动作
            document.addEventListener('drop', e => {
                e.preventDefault();
            }, false);
        },
        methods: {
            addCircle ($event) {
                const { target } = $event;
                const classes = [...target.classList].join(' ');

                console.log(classes);

            },
        },
    };
</script>
