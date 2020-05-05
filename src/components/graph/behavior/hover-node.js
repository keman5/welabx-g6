export default G6 => {
  G6.registerBehavior('hover-node', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      };
    },
    onNodeEnter (e) {
      this.graph.setItemState(e.item, 'anchorShow', true);
    },
    onNodeLeave (e) {
      this.graph.setItemState(e.item, 'anchorShow', false);
    },
  });
};
