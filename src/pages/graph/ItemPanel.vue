<template>
  <div
    id="itemPanel"
    ref="itemPanel"
    :class="{'hidden': itemVisible}"
  >
    <i class="iconfont icon-h-drag" />
    <div class="icon-tool">
      <i
        class="node circle"
        draggable="true"
        data-label="开始"
        data-shape="circle-node"
        fill="#eef5fe"
      >开始</i>
      <i
        class="node warning"
        draggable="true"
        data-label="警告"
        data-shape="rect-node"
        fill="#f8ecda"
      >警告</i>
      <i
        class="node end"
        draggable="true"
        data-label="结束"
        data-shape="rect-node"
        fill="#f9e3e2"
      >结束</i>
      <i
        draggable="true"
        data-label="圆形节点"
        data-shape="circle-node"
        class="node iconfont icon-circle"
      />
      <i
        draggable="true"
        data-label="方形节点"
        data-shape="rect-node"
        class="node iconfont icon-rect"
      />
      <i
        draggable="true"
        data-label="椭圆形节点"
        data-shape="ellipse-node"
        class="node iconfont icon-ellipse"
      />
      <i
        draggable="true"
        data-label="菱形节点"
        data-shape="diamond-node"
        class="node iconfont icon-diamond"
      />
      <i
        draggable="true"
        data-label="对话框节点"
        data-shape="modelRect-node"
        class="node iconfont icon-model-rect"
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
        name: 'ItemPanel',
        data () {
            return {
                itemVisible: false,
            };
        },
        mounted () {
            const icons = [...this.$refs.itemPanel.querySelector('.icon-tool').querySelectorAll('.node')];

            icons.forEach(icon => {
                icon.addEventListener('dragstart', event => {
                  const shape = icon.getAttribute('data-shape');
                  const label = icon.getAttribute('data-label');
                  const fill = icon.getAttribute('fill');

                  /* 设置拖拽传输数据 */
                  event.dataTransfer.setData('dragComponent',
                      JSON.stringify({
                        label,
                        shape,
                        fill,
                      }),
                  );
                });
            });

            // 阻止默认动作
            document.addEventListener('drop', e => {
                e.preventDefault();
            }, false);
        },
    };
</script>

<style lang="scss">
#itemPanel {
  position   : absolute;
  top        : 0;
  left       : 0;
  bottom     : 0;
  z-index    : 10;
  width      : 100px;
  background : #fff;
  padding-top: 65px;
  transition : transform .3s ease-in-out;
  box-shadow : 0 0 2px 0 rgba(0, 0, 0, .1);

  &.hidden {
    transform: translate(-100%, 0);
  }

  .icon-h-drag {
    position   : absolute;
    top        : 40px;
    left       : 0;
    width      : 100%;
    height     : 20px;
    line-height: 20px;
    font-size  : 18px;
    background : #f5f5f5;
    text-align : center;
    cursor     : move;

    &:hover {
      background: #f1f1f1;
    }
  }

  .gb-toggle-btn {
    width        : 10px;
    height       : 20px;
    top          : 50%;
    left         : 100%;
    border-radius: 0 10px 10px 0;
    box-shadow   : 2px 0 2px 0 rgba(0, 0, 0, .1);
    transform    : translate(0, -50%);
  }

  .split {
    height    : 1px;
    display   : block;
    background: #e0e0e0;
    margin    : 5px 0;
  }

  .icon-tool {
    padding:10px;
    text-align    : center;
    .iconfont {
      display       : block;
      width         : 40px;
      height        : 40px;
      line-height   : 40px;
      font-size     : 30px;
      cursor        : move;
      border        : 1px solid transparent;
      margin: 0 auto;

      &:hover {
        border-color: #ccc;
      }
    }
    .node{
      display: block;
      margin-bottom: 10px;
      cursor        : move;
    }
    .circle{
      height: 80px;
      line-height: 80px;
      border-radius: 50%;
      border: 1px solid #ccc;
      background:#eef5fe;
    }
    .warning{
      height: 40px;
      line-height: 40px;
      border-left: 4px solid #E6A23C;
      background:#f8ecda;
    }
    .end{
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      background:#f9e3e2;
    }
  }
}
</style>
