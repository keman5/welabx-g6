export default G6 => {
  G6.registerBehavior('hover-node', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      };
    },
    onNodeEnter (e) {
      // 显示当前节点的锚点
      this.graph.setItemState(e.item, 'anchorShow', true); // 二值状态
    },
    onNodeLeave (e) {
      // 将锚点再次隐藏
      this.graph.setItemState(e.item, 'anchorShow', false); // 二值状态
    },
  });
};
