/**
 * @author claude
 * @date 2018/3/15
 * @description 边激活事件
 */

export default G6 => {
  G6.registerBehavior('active-edge', {
    getDefaultCfg () {
      return {
        editMode: false,
      };
    },
    getEvents () {
      return {
        'canvas:click':    'onCanvasClick',
        'edge:click':      'onEdgeClick',
        'edge:dblclick':   'ondblEdgeClick',
        'edge:mouseenter': 'onMouseEnter',
        'edge:mousemove':  'onMouseMove',
        'edge:mouseleave': 'onMouseLeave',
      };
    },
    onCanvasClick (e) {
      this.editMode = false;
      this._clearSelected();
    },
    onEdgeClick (e) {
      this._clearSelected();
      this.editMode = true;
      // 设置当前节点的 click 状态为 true
      this.graph.setItemState(e.item.get('id'), 'edgeState', 'selected');
      // 将点击事件发送给 graph 实例
      this.graph.emit('after-edge-selected', e);
    },
    ondblEdgeClick (e) {
      this._clearSelected();
      this.editMode = true;
      // 设置当前节点的 click 状态为 true
      this.graph.setItemState(e.item, 'edgeState', 'selected');
      // 将点击事件发送给 graph 实例
      this.graph.emit('after-edge-dblclick', e);
    },
    // hover edge
    onMouseEnter (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeState', 'hover');
      }
      this.graph.emit('on-edge-mouseenter', e);
    },
    onMouseMove (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeState', 'hover');
      }
      this.graph.emit('on-edge-mousemove', e);
    },
    // out edge
    onMouseLeave (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeState', 'default');
      }
      this.graph.emit('on-edge-mouseleave', e);
    },
    // 清空已选
    _clearSelected () {
      const selectedNodes = this.graph.findAllByState('node', 'nodeState:selected');

      selectedNodes.forEach(node => {
        this.graph.clearItemStates(node, ['nodeState:selected']);
      });

      const selectedEdges = this.graph.findAllByState('edge', 'edgeState:selected');

      selectedEdges.forEach(edge => {
        this.graph.clearItemStates(edge, ['edgeState:selected']);
      });
      this.graph.emit('after-edge-selected');
    },
  });
};
