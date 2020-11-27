/*!
 * @author claude
 * date 06/09/2020
 * 注册边
 */

export default (G6, cfg) => {
  G6.registerEdge('hvh-h-edge', {
    draw (cfg, group) {
      const xOffset = 40;
      const { startPoint, endPoint } = cfg;
      const Ydiff = endPoint.y - startPoint.y;
      // 水平结束点坐标
      const horizontalEndPoint = {
        x: startPoint.x,
        y: endPoint.y,
      };
      // 开口方向
      const left = startPoint.x - endPoint.x > 0;
      const path = Ydiff === 0 ? [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y],
      ] : [
        ['M', startPoint.x, startPoint.y],
        ['L', left ? startPoint.x - xOffset : startPoint.x + xOffset, startPoint.y],
        ['L', left ? horizontalEndPoint.x - xOffset : horizontalEndPoint.x + xOffset, endPoint.y > startPoint.y ? horizontalEndPoint.y - 10 : horizontalEndPoint.y + 10],
        ['Q', left ? horizontalEndPoint.x - xOffset : horizontalEndPoint.x + xOffset, horizontalEndPoint.y, left ? horizontalEndPoint.x - xOffset - 10 : horizontalEndPoint.x + xOffset + 10, horizontalEndPoint.y],
        ['L', endPoint.x, endPoint.y],
      ];

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

      const { text } = cfg.targetNode.getModel();

      if (text) {
        const label = group.addShape('text', {
          attrs: {
            x:        horizontalEndPoint.x + xOffset + 10, // 居中
            y:        endPoint.y - 30,
            text:     text || '',
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
