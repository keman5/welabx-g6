export default G6 => {
    G6.registerBehavior('dragNode', {
        getDefaultCfg() {
            return {
                // 记录当前拖拽模式
                dragMode:   'node',
                dragNodeId: null,
            };
        },
        getEvents () {
            return {
                'node:dragstart': 'onDragStart',
                'node:drag':      'onDrag',
                'node:dragend':   'onDragEnd',
                'node:drop':      'onDrop',
            };
        },
        // 拖拽开始
        onDragStart (e) {
            if (e.target.cfg.isAnchor) {
                // 拖拽锚点
                this.dragMode = 'link';
                this.dragNodeId = e.item.get('id');
                const nodes = this.graph.findAll('node', node => node);

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'anchorActived', true);
                });
            } else {
                // 拖拽节点
                this.dragMode = 'node';
                this.graph.setItemState(e.item, 'nodeOnDragStart', true);
            }
        },
        // 拖拽中
        onDrag (e) {
            this.graph.setItemState(e.item, 'nodeOnDrag', true);
        },
        // 拖拽结束
        onDragEnd (e) {
            if (this.dragMode === 'link') {
                const nodes = this.graph.findAll('node', node => node);

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'anchorActived', false);
                });
            } else if(this.dragMode === 'node') {
                this.graph.setItemState(e.item, 'nodeOnDragEnd', true);
            }
        },
        onDrop (e) {
            // e.item 当前拖拽节点 | e.target 当前释放节点
            if (this.dragNodeId && e.target.cfg.isAnchor) {
                this.graph.addItem('edge', {
                    source:       this.dragNodeId,
                    target:       e.target.cfg.nodeId,
                    sourceAnchor: 0,
                    targetAnchor: 0,
                });
            }
        },
    });
};
