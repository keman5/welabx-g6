export default G6 => {
    G6.registerBehavior('ahchor-active', {
        getEvents () {
            return {
                'anchor:mouseenter': 'onAnchorEnter',
                'anchor:mousemove':  'onAnchorEnter',
                'anchor:mouseleave': 'onAnchorLeave',
            };
        },
        // 移入 anchor
        onAnchorEnter (e) {
            this.graph.setItemState(e.item, 'active-anchor', true);
        },
        // 移除 anchor
        onAnchorLeave (e) {
            this.graph.setItemState(e.item, 'active-anchor', false);
        },
    });
};
