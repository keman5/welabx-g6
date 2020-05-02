export default G6 => {
    G6.registerBehavior('delete-item', {
        getEvents () {
            return {
                'keydown': 'onKeydown',
            };
        },
        onKeydown (e) {
            const graph = this.graph;
            const nodes = this.graph.findAllByState('node', 'nodeSelected');
            const edges = this.graph.findAllByState('edge', 'edgeSelected');

            /**
             * TODO:
             * 删除节点时, 将与该节点连接的后代节点也删除
             */
            if (e.keyCode === 8) {
                if (nodes && nodes.length) {
                    const $node = nodes[0].getContainer().get('item');

                    graph.emit('before-node-removed', {
                        target: $node,
                        callback (confirm) {
                            // 内部this已改变
                            if (confirm) {
                                graph.remove($node);
                                graph.set('after-node-selected', []);
                                // 发射事件
                                graph.emit('after-node-selected');
                                graph.emit('after-node-removed', $node);

                            }
                        },
                    });
                }

                // 删除选中的边
                if (edges && edges.length) {
                    const $edge = edges[0].getContainer().get('item');

                    graph.emit('before-node-removed', {
                        target: $edge,
                        callback (confirm) {
                            if (confirm) {
                                graph.remove($edge);
                                graph.set('after-edge-selected', []);
                                // 发射事件
                                graph.emit('after-edge-selected');
                                graph.emit('after-edge-removed', $edge);
                            }
                        },
                    });
                }
            }
        },
    });
};
