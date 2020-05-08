export default G6 => {
  G6.registerBehavior('delete-item', {
    getEvents () {
      return {
        'keydown': 'onKeydown',
      };
    },
    onKeydown (e) {
      const graph = this.graph;

      // 实例化时监听了键盘事件, 防止在画布外仍然能监听到画布内的事件
      if (graph.cfg.canvas.cfg.el.getAttribute('isFocused') !== 'true') return;

      /**
       * TODO:
       * 删除节点时, 将与该节点连接的后代节点也删除
       */
      if (e.keyCode === 8) {
        const nodes = graph.findAllByState('node', 'nodeState:selected');

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
        const edges = graph.findAllByState('edge', 'edgeState:selected');

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
