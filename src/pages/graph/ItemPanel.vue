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
        data-type="edge"
        data-shape="line"
        class="iconfont icon-line"
      />
      <i
        draggable="true"
        data-type="edge"
        data-shape="quadratic"
        class="iconfont icon-quadratic"
      />
      <i class="split" />
      <i
        draggable="true"
        data-type="node"
        data-shape="circle"
        class="iconfont icon-circle"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="rect"
        class="iconfont icon-rect"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="ellipse"
        class="iconfont icon-ellipse"
      />
      <i
        draggable="true"
        data-type="node"
        data-shape="diamond"
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
