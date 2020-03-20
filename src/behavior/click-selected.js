// 点选项目
export default G6 => {
    G6.registerBehavior('click-selected', {
        // 默认配置
        getDefaultCfg () {
            return {
                // 多选
                multiple: false,
            };
        },
        // 事件映射
        getEvents () {
            return {
                'node:click':      'onClick',
                'edge:click':      'onClick',
                'canvas:click':    'onCanvasClick',
                'edge:mouseover':  'onEdgeMouseOver',
                'edge:mouseleave': 'onEdgeMouseLeave',
                'node:mouseover':  'onNodeMouseOver',
                'node:mouseleave': 'onNodeMouseLeave',
            };
        },
        // 点击事件
        onClick (e) {
            // 先将所有当前是 click 状态的节点/edge 置为非 selected 状态
            this._clearSelected();
            // 获取被点击的节点元素对象
            // 设置当前节点的 click 状态为 true
            this.graph.setItemState(e.item, 'selected', true);
            // 将点击事件发送给 graph 实例
            this.graph.emit('after-item-selected', e.item);
        },
        onCanvasClick () {
            this._clearSelected();
        },
        // hover edge
        onEdgeMouseOver (e) {
            this.graph.setItemState(e.item, 'edgeHover', true);
        },
        // 移出 edge
        onEdgeMouseLeave (e) {
            this.graph.setItemState(e.item, 'edgeHover', false);
        },
        // hover node
        onNodeMouseOver (e) {
            this.graph.setItemState(e.item, 'nodeHover', true);
        },
        // 移出 node
        onNodeMouseLeave (e) {
            this.graph.setItemState(e.item, 'nodeHover', false);
        },
        // 清空已选
        _clearSelected () {
            const selectedNodes = this.graph.findAllByState('node', 'selected');

            selectedNodes.forEach(current => {
                this.graph.setItemState(current, 'selected', false);
            });

            const selectedEdges = this.graph.findAllByState('edge', 'selected');

            selectedEdges.forEach(current => {
                this.graph.setItemState(current, 'selected', false);
            });
            this.graph.emit('after-item-selected');
        },
    });
};
