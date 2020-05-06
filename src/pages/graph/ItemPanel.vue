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
        data-type="node"
        data-shape="circle-node"
        class="iconfont icon-circle"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="rect-node"
        class="iconfont icon-rect"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="ellipse-node"
        class="iconfont icon-ellipse"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="diamond-node"
        class="iconfont icon-diamond"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="modelRect"
        class="iconfont icon-model-rect"
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
                icon.addEventListener('click', e => {
                    this.$emit(`canvas-add-${e.target.dataset.type}`, e);
                });
                icon.addEventListener('dragend', e => {
                    this.$emit(`canvas-add-${e.target.dataset.type}`, e);
                });
            });

            // 阻止默认动作
            document.addEventListener('drop', e => {
                e.preventDefault();
            }, false);
        },
        methods: {
            addEdge ($event) {

            },
        },
    };
</script>
