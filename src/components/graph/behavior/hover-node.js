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
      e.item.setState('anchorShow', true); // 二值状态
    },
    onNodeLeave (e) {
      // 将锚点再次隐藏
      e.item.setState('anchorShow', false); // 二值状态
    },
  });
};
