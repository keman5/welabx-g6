export default G6 => {
  G6.registerBehavior('active-anchor', {
    getEvents () {
      return {
        'anchor:mouseenter': 'onAnchorEnter',
        // 'anchor:mousemove':  'onAnchorEnter',
        'anchor:mouseleave': 'onAnchorLeave',
        'anchor:dragstart':  'onDragStart',
        'anchor:drag':       'onDrag',
        'anchor:dragenter':  'onDragEnter',
        'anchor:dragend':    'onDragEnd',
      };
    },
    // 移入 anchor
    onAnchorEnter (e) {
      this.graph.setItemState(e.item, 'anchorActived', true);
    },
    // 移除 anchor
    onAnchorLeave (e) {
      this.graph.setItemState(e.item, 'anchorActived', false);
    },
    // 拖拽开始
    onDragStart (e) {
      this.target = e.item;
      this.origin = {
        x: e.x,
        y: e.y,
      };

      this.graph.setItemState(e.item, 'anchorOnDragStart', true);
    },
    // 拖拽中
    onDrag (e) {
      this.graph.setItemState(e.item, 'anchorOnDrag', true);
    },
    // onDragEnter
    onDragEnter (e) {
      console.log(e.target);

    },
    // 拖拽结束
    onDragEnd (e) {
      this.graph.setItemState(e.item, 'anchorOnDragEnd', false);
    },
  });
};
