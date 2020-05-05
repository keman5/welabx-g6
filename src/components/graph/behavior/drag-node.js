export default G6 => {
  G6.registerBehavior('drag-node', {
    getDefaultCfg () {
      return {
        // 记录当前拖拽模式
        dragTarget:    'node',
        dragStartNode: {},
        distance:      [], // 鼠标距离节点中心位置的距离
      };
    },
    getEvents () {
      return {
        'node:mousedown': 'onMousedown',
        'node:mouseup':   'onMouseup',
        'node:dragstart': 'onDragStart',
        'node:drag':      'onDrag',
        'node:dragend':   'onDragEnd',
        'node:dragenter': 'onDragEnter',
        'node:drop':      'onDrop',
      };
    },
    // 鼠标按下显示锚点光圈
    onMousedown (e) {
      if (e.target.cfg.isAnchor) {
        // 拖拽锚点
        this.dragTarget = 'anchor';
        this.dragStartNode = {
          ...e.item._cfg,
          anchorIndex: e.target.cfg.index,
        };
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          this.graph.setItemState(node, 'anchorActived', true);
        });
      }
    },
    onMouseup (e) {
      if (this.dragTarget === 'anchor') {
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          node.clearStates('anchorActived');
        });
      }
    },
    // 拖拽开始
    onDragStart (e) {
      if (e.target.cfg.isAnchor) {
        // 拖拽锚点
      } else {
        // 拖拽节点
        e.item.toFront();
        this.dragTarget = 'node';
        this._nodeOnDragStart(e, e.item.getContainer());
        // this.graph.setItemState(e.item, 'nodeOnDragStart', e); // 通知外部组件
      }
    },
    // 拖拽中
    onDrag (e) {
      if (this.dragTarget === 'node') {
        this._nodeOnDrag(e, e.item.getContainer());
        // this.graph.setItemState(e.item, 'nodeOnDrag', e); // 通知外部组件
      }
    },
    // 拖拽结束
    onDragEnd (e) {
      const group = e.item.getContainer();

      if (this.dragTarget === 'anchor') {
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          node.clearStates('anchorActived');
        });
      } else if (this.dragTarget === 'node') {
        this._nodeOnDragEnd(e, group);
        // this.graph.setItemState(e.item, 'nodeOnDragEnd', e);
      }
    },
    // 锚点拖拽结束添加边
    onDrop (e) {
      // e.item 当前拖拽节点 | e.target 当前释放节点
      if (this.dragStartNode.id && e.target.cfg.isAnchor && (this.dragStartNode.id !== e.target.cfg.nodeId)) {

        this.graph.emit('before-edge-add', {
          source:       this.dragStartNode.group.get('item'),
          target:       e.item.getContainer().get('item'),
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
      const currentShape = item.get('currentShape');
      const { width, height, centerX, centerY } = item.getBBox();
      const { shapeType } = item.get('shapeFactory')[currentShape];

      let attrs = {
        fillOpacity: 0.1,
        fill:        'rgb(24, 144, 255, 1)',
        stroke:      '#1890FF',
        cursor:      'move',
        lineDash:    [4, 4],
        width,
        height,
      };

      switch (shapeType) {
        case 'circle':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs = {
            ...attrs,
            x: 0,
            y: 0,
            r: width / 2,
          };
          break;
        case 'rect':
          this.distance = [e.x - centerX + width / 2, e.y - centerY + height / 2];
          attrs = {
            ...attrs,
            x: -width / 2,
            y: -height / 2,
            r: width / 2,
          };
          if (radius) attrs.radius = radius;
          break;
        case 'ellipse':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs = {
            ...attrs,
            x:  0,
            y:  0,
            rx: width / 2,
            ry: height / 2,
          };
          break;
        case 'path':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs.path = item.get('keyShape').attrs.path;
          attrs.size = [width, height];
          attrs.x = 0;
          attrs.y = 0;
          break;
      }

      const shadowNode = group.addShape(shapeType, {
        attrs,
        className: 'shadow-node',
      });

      shadowNode.toFront();
    },

    /**
     * @description 节点拖拽事件
     */
    _nodeOnDrag (e, group) {
      // 记录鼠标拖拽时与图形中心点坐标的距离
      const item = group.get('item');
      const { width, height, centerX, centerY } = item.getBBox();
      const currentShape = item.get('currentShape');
      const { shapeType } = item.get('shapeFactory')[currentShape];
      const shadowNode = group.getItem('shadow-node');

      if (shapeType === 'path') {
        const dx = e.x - centerX - this.distance[0];
        const dy = e.y - centerY - this.distance[1];

        shadowNode.attr({
          path: [
            ['M', dx, dy - height / 2], // 上部顶点
            ['L', dx + width / 2, dy], // 右侧顶点
            ['L', dx, dy + height / 2], // 下部顶点
            ['L', dx - width / 2, dy], // 左侧顶点
            ['Z'], // 封闭
          ],
        });
      } else {
        shadowNode.attr({
          x: e.x - centerX - this.distance[0],
          y: e.y - centerY - this.distance[1],
        });

      }
      shadowNode.toFront();
    },

    /**
     * @description 节点拖拽结束事件
     */
    _nodeOnDragEnd (e, group) {
      const node = group.get('item');
      const { width, height } = node.getBBox();
      const shadowNode = group.getItem('shadow-node');
      const currentShape = node.get('currentShape');
      const { shapeType } = node.get('shapeFactory')[currentShape];
      const coords = {
        x: 0,
        y: 0,
      };

      switch (shapeType) {
        case 'ellipse':
        case 'circle':
          coords.x = e.x - this.distance[0];
          coords.y = e.y - this.distance[1];
          break;
        case 'rect':
          coords.x = e.x - this.distance[0] + width / 2;
          coords.y = e.y - this.distance[1] + height / 2;
          break;
        case 'path':
          coords.x = e.x - this.distance[0];
          coords.y = e.y - this.distance[1];
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
