export default G6 => {
    G6.registerBehavior('delete-item', {
        getEvents () {
            return {
                'keydown': 'onKeydown',
            };
        },
        onKeydown (e) {
            const nodes = this.graph.findAllByState('node', 'nodeSelected');
            const edges = this.graph.findAllByState('edge', 'edgeSelected');

            /**
             * TODO:
             * 删除节点时, 将与该节点连接的后代节点也删除
             */
            if (e.keyCode === 8) {
                if (nodes && nodes.length) {
                    this.graph.emit('before-node-removed', confirm => {
                        if (confirm) {
                            const $node = nodes[0];

                            this.graph.remove(nodes[0]);
                            this.graph.set('after-item-selected', []);
                            // 发射事件
                            this.graph.emit('after-item-selected');
                            this.graph.emit('after-node-removed', $node);

                            // 删除选中的边
                            if (edges && edges.length) {
                                const $edge = edges[0];

                                this.graph.remove(edges[0]);
                                this.graph.set('after-edge-selected', []);
                                // 发射事件
                                this.graph.emit('after-edge-selected');
                                this.graph.emit('after-edge-removed', $edge);
                            }
                        }
                    });
                }
            }
        },
    });
};
