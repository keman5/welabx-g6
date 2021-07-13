export default G6 => {
  G6.registerBehavior('hover-node', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      };
    },
    shouldBegin (e) {
      return true;
    },
    onNodeEnter (e) {
      if (!this.shouldBegin(e)) return;
      // 显示当前节点的锚点
      e.item.setState('anchorShow', true); // 二值状态
    },
    onNodeLeave (e) {
      if (!this.shouldBegin(e)) return;
      // 将锚点再次隐藏
      e.item.setState('anchorShow', false); // 二值状态
    },
  });
};
