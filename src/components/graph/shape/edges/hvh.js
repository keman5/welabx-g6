/*!
 * @author claude
 * date 06/09/2020
 * 注册边
 */

export default G6 => {
  G6.registerEdge('hvh', {
    itemType: 'edge',
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const startY = startPoint.y;
      const endY = endPoint.y;
      const Ydiff = endY - startY;
      const yOffset = 20;
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

      let path = [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x + 50, startPoint.y],
        ['L', line1EndPoint.x + 50, line1EndPoint.y],
        [
          'Q',
          controlPoint.x + 50,
          controlPoint.y,
          line2StartPoint.x + 50,
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
        draggable: true,
      });

      const model = cfg.target.getModel();

      let not = model.not || '';

      const textStr = model.text || not;
      const fills = model.fills || '';

      if (not) {
        not = textStr !== 'default' ? textStr : '';
        group.addShape('text', {
          attrs: {
            x:            line2StartPoint.x + 40, // 居中
            y:            endPoint.y - 20,
            autoRotate:   true,
            width:        100,
            height:       50,
            textAlign:    'left',
            textBaseline: 'middle',
            text:         not,
            fontSize:     16,
            fill:         fills ? fills : '#333',
            stroke:       '#fff',
          },
        });
      }
      return shape;
    },
  });
};
