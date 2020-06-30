export default (G6, cfg) => {
  G6.registerEdge('hvh-h-edge', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const startX = startPoint.x;
      const endX = endPoint.x;
      const startY = startPoint.y;
      const endY = endPoint.y;
      const Ydiff = endY - startY;

      let path = null;

      if (Ydiff === 0) {
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endY],
        ];
      } else {
        const yOffset = 1;
        const xOffset = endX > startX ? 20 : -20;
        const slope = endX > startX ? 40 : -40;
        const line1EndPoint = {
          x: startPoint.x,
          y: startPoint.y > 0 ? startPoint.y + yOffset : startPoint.y - yOffset,
        };
        const line2StartPoint = {
          x: line1EndPoint.x + xOffset,
          y: endY,
        };
        // 控制点坐标
        const controlPoint = {
          x: ((line1EndPoint.x - startPoint.x) * (endY - startPoint.y)) / (line1EndPoint.y - startPoint.y) + startPoint.x,
          y: endY,
        };

        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x + slope, startPoint.y],
          ['L', line1EndPoint.x + slope, line1EndPoint.y],
          ['Q', controlPoint.x + slope, controlPoint.y, line2StartPoint.x + slope, line2StartPoint.y],
          ['L', endPoint.x, endY],
        ];
      }

      // 获取边的样式
      const { edgeStyle } = cfg.sourceNode.getModel();
      const shape = group.addShape('path', {
        attrs: {
          path,
          stroke:   '#1890FF',
          endArrow: false,
          ...cfg.style,
          ...edgeStyle,
        },
        name:      'hvh-edge',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });

      const { note } = cfg.targetNode.getModel();

      if (note) {
        const line2 = endX > startX ? 50 : -80;

        const label = group.addShape('text', {
          attrs: {
            x:        startPoint.x + (endX > startX ? 20 : -20) + line2,
            y:        endY - 20,
            text:     note || '',
            fill:     '#333',
            fontSize: 16,
          },
          name:   'hvh-edge-label',
          zIndex: 10,
        });

        group.sort();
        label.toFront();
      }
      return shape;
    },
    ...cfg,
  });
};
