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
    // hover edge
    onEdgeClick (e) {
      this._clearSelected();
      this.editMode = true;
      // 设置当前节点的 click 状态为 true
      this.graph.setItemState(e.item.get('id'), 'edgeSelected', true);
      // 将点击事件发送给 graph 实例
      this.graph.emit('after-edge-selected', e);
    },
    ondblEdgeClick (e) {
      this._clearSelected();
      this.editMode = true;
      // 设置当前节点的 click 状态为 true
      this.graph.setItemState(e.item, 'edgeSelected', true);
      // 将点击事件发送给 graph 实例
      this.graph.emit('after-edge-dblclick', e);
    },
    onMouseEnter (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeHover', true);
        this.graph.emit('on-edge-mouseenter', e);
      }
    },
    onMouseMove (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeHover', true);
        this.graph.emit('on-edge-mousemove', e);
      }
    },
    onMouseLeave (e) {
      if (!this.editMode) {
        this.graph.setItemState(e.item, 'edgeHover', false);
        this.graph.emit('on-edge-mouseleave', e);
      }
    },
    // 清空已选
    _clearSelected () {
      const selectedNodes = this.graph.findAllByState('node', 'nodeSelected');

      selectedNodes.forEach(current => {
        this.graph.setItemState(current, 'nodeSelected', false);
      });

      const selectedEdges = this.graph.findAllByState('edge', 'edgeSelected');

      selectedEdges.forEach(current => {
        this.graph.setItemState(current, 'edgeSelected', false);
      });
      this.graph.emit('after-edge-selected');
    },
  });
};
