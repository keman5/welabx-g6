export default G6 => {
    G6.registerBehavior('dragNode', {
        getDefaultCfg() {
            return {
                // 记录当前拖拽模式
                dragMode: 'node',
            };
        },
        getEvents () {
            return {
                'node:dragstart': 'onDragStart',
                'node:drag':      'onDrag',
                'node:dragend':   'onDragEnd',
                // 'circle:mouseenter': 'onDragStart',
            };
        },
        // 拖拽开始
        onDragStart (e) {
            if (e.target.cfg.isAnchor) {
                // 拖拽锚点
                this.dragMode = 'link';
                const nodes = this.graph.findAll('node', node => node);

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'anchorActived', true);
                });

                // 添加 path
                /* this.graph.setItemState(e.item, 'anchorActived', {
                    ...e.target.cfg.canvasBox,
                }); */
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
            setTimeout(() => {
                this.graph.paint();
            }, 66);
        },
    });
};
