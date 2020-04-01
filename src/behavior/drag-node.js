export default G6 => {
    G6.registerBehavior('drag-node', {
        getDefaultCfg() {
            return {
                // 记录当前拖拽模式
                dragMode:      'node',
                dragStartNode: {
                    id:          null,
                    anchorIndex: null,
                },
                distance: [], // 鼠标距离节点中心位置的距离
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
                this.dragStartNode = {
                    id:          e.item.get('id'),
                    anchorIndex: e.target.cfg.index,
                };
                const nodes = this.graph.findAll('node', node => node);

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'anchorActived', true);
                });
            } else {
                // 拖拽节点
                e.item.toFront();
                this.dragMode = 'node';
                this._nodeOnDragStart(e, e.item.getContainer());
                // this.graph.setItemState(e.item, 'nodeOnDragStart', e);
            }
        },
        // 拖拽中
        onDrag (e) {
            if (this.dragMode === 'node') {
                this._nodeOnDrag(e, e.item.getContainer());
                // this.graph.setItemState(e.item, 'nodeOnDrag', e);
            }
        },
        // 拖拽结束
        onDragEnd (e) {
            const group = e.item.getContainer();

            if (this.dragMode === 'link') {
                const nodes = this.graph.findAll('node', node => node);

                nodes.forEach(node => {
                    this.graph.setItemState(node, 'anchorActived', false);
                });
            } else if (this.dragMode === 'node') {
                this._nodeOnDragEnd(e, group);
                // this.graph.setItemState(e.item, 'nodeOnDragEnd', e);
            }
        },
        onDrop (e) {
            // e.item 当前拖拽节点 | e.target 当前释放节点
            if (this.dragStartNode.id && e.target.cfg.isAnchor) {
                this.graph.addItem('edge', {
                    source:       this.dragStartNode.id,
                    target:       e.target.cfg.nodeId,
                    sourceAnchor: this.dragStartNode.anchorIndex,
                    targetAnchor: e.target.cfg.index,
                });
            }
        },

        /**
         * @description 节点拖拽开始事件
         */
        _nodeOnDragStart (e, group) {
            const item = group.get('item');
            const { radius } = item.get('originStyle');
            const { width, height, centerX, centerY } = item.getBBox();
            const shape = item.get('currentShape').replace(/-node/, '');
            const coords = {
                x: 0,
                y: 0,
            };

            switch (shape) {
                case 'circle':
                    this.distance = [e.x - centerX, e.y - centerY];
                    coords.x = 0;
                    coords.y = 0;
                    coords.r = width / 2;
                    break;
                case 'rect':
                    this.distance = [e.x - centerX + width / 2, e.y - centerY + height / 2];
                    if (radius) coords.radius = radius;
                    coords.x = -width / 2;
                    coords.y = -height / 2;
                    break;
            }

            const shadowNode = group.addShape(shape, {
                attrs: {
                    ...coords,
                    fill:     'rgb(24, 144, 255, 0.1)',
                    stroke:   '#1890FF',
                    lineDash: [4, 4],
                    width,
                    height,
                },
                className: 'shadow-node',
            });

            shadowNode.toFront();
        },

        /**
         * @description 节点拖拽事件
         */
        _nodeOnDrag(value, group) {
            // 记录鼠标拖拽时与图形中心点坐标的距离
            const node = group.get('item');
            const { centerX, centerY } = node.getBBox();
            const shadowNode = group.getItem('shadow-node');

            shadowNode.attr({
                x: value.x - centerX - this.distance[0],
                y: value.y - centerY - this.distance[1],
            });
            shadowNode.toFront();
        },

        /**
         * @description 节点拖拽结束事件
         */
        _nodeOnDragEnd (value, group) {
            const node = group.get('item');
            const { width, height } = node.getBBox();
            const shadowNode = group.getItem('shadow-node');
            const shape = group.get('item').get('currentShape').replace(/-node/, '');
            const coords = {
                x: 0,
                y: 0,
            };

            switch (shape) {
                case 'circle':
                    coords.x = value.x - this.distance[0];
                    coords.y = value.y - this.distance[1];
                    break;
                case 'rect':
                    coords.x = value.x - this.distance[0] + width / 2;
                    coords.y = value.y - this.distance[1] + height / 2;
                    break;
            }

            shadowNode.remove();

            // 更新坐标
            node.updatePosition(coords);

            // 当节点位置发生变化时，刷新所有节点位置，并重计算边的位置
            this.graph.refreshPositions();
        },
    });
};
