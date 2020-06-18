export default G6 => {
  G6.registerEdge('hvh-h', {
    itemType: 'edge',
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const startX = startPoint.x;
      const endX = endPoint.x;
      const startY = startPoint.y;
      const endY = endPoint.y;
      const Ydiff = endY - startY;
      const yOffset = 20;
      const xOffset = endX > startX ? 20 : -20;
      const slope = endX > startX ? 50 : -50;
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

      let path = [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x + slope, startPoint.y],
        ['L', line1EndPoint.x + slope, line1EndPoint.y],
        [
          'Q',
          controlPoint.x + slope,
          controlPoint.y,
          line2StartPoint.x + slope,
          line2StartPoint.y,
        ],
        ['L', endPoint.x, endPoint.y],
      ];

      if (Ydiff === 0) {
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ];
      }
      const shape = group.addShape('path', {
        attrs: {
          path,
          ...cfg.style,
          stroke:   '#368FF8',
          endArrow: false,
        },
        name:      'hvh-line',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
      const not = cfg.target.getModel().not || '';

      if (not) {
        const line2 = endX > startX ? 50 : -80;

        group.addShape('text', {
          attrs: {
            x:            line2StartPoint.x + line2, // 居中
            y:            endPoint.y - 20,
            width:        100,
            height:       50,
            textAlign:    'left',
            textBaseline: 'middle',
            text:         not,
            fontSize:     16,
            fill:         '#333',
            stroke:       '#fff     ',
          },
        });
      }
      return shape;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      const shape = group.get('children')[0]; // 顺序根据 draw 时确定

      if (name === 'active') {
        shape.attr('opacity', 1);
      } else if (name !== 'active' && value) {
        shape.attr('opacity', 0.2);
      }
    },
  });
};
