/*!
 * @author claude
 * date 06/09/2020
 * 注册边
 */

export default (G6, cfg) => {
  G6.registerEdge('hvh-edge', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const Ydiff = endPoint.y - startPoint.y;
      const yOffset = 1;
      const xOffset = 20;

      const line1EndPoint = {
        x: startPoint.x,
        y: startPoint.y > 0 ? startPoint.y + yOffset : startPoint.y - yOffset,
      };
      const line2StartPoint = {
        x: line1EndPoint.x + xOffset,
        y: endPoint.y,
      };

      // 控制点坐标
      const controlPoint = {
        x: ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) / (line1EndPoint.y - startPoint.y) + startPoint.x,
        y: endPoint.y,
      };

      const path = Ydiff === 0 ? [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ] : [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x + 50, startPoint.y],
        ['L', line1EndPoint.x + 50, line1EndPoint.y],
        ['Q', controlPoint.x + 50, controlPoint.y, line2StartPoint.x + 50, line2StartPoint.y],
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
        draggable: true,
      });

      const { note } = cfg.targetMode.getModel();

      if (note) {
        const label = group.addShape('text', {
          attrs: {
            x:          line2StartPoint.x + 40, // 居中
            y:          endPoint.y - 20,
            autoRotate: true,
            text:       note || '',
            fill:       '#333',
            stroke:     '#fff',
            fontSize:   16,
          },
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
