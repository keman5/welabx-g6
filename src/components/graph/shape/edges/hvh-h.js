/*!
 * @author claude
 * date 06/09/2020
 * 注册边
 */

export default (G6, graph, cfg) => {
  G6.registerEdge('hvh-h-edge', {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const startX = startPoint.x;
      const endX = endPoint.x;
      const startY = startPoint.y;
      const endY = endPoint.y;
      const Ydiff = endY - startY;

      let path = null;

      // 水平节点
      if (Ydiff === 0) {
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endY],
        ];
      } else {
        const yOffset = 0.1; // 这里必须是非0数字
        const xOffset = endX > startX ? 20 : -20; // 弧度x轴
        const slope = endX > startX ? 40 : -40; // 边与起始点的距离(为0则从起始位置分叉)
        // 节点第1个弧度的位置
        const line1EndPoint = {
          x: startPoint.x, // 横坐标
          y: startPoint.y > 0 ? startPoint.y + yOffset : startPoint.y - yOffset, // 根据方向判断纵坐标位置
        };
        // 节点向右上方弯曲时的弧度坐标
        const line2StartPoint = {
          x: line1EndPoint.x + xOffset,
          y: endY,
        };
        // 边分叉控制点的坐标
        const controlPoint = {
          x: ((line1EndPoint.x - startPoint.x) * (endY - startPoint.y)) / (line1EndPoint.y - startPoint.y) + startPoint.x,
          y: endY, // 纵坐标 = 结束位置
        };

        path = [
          ['M', startPoint.x, startPoint.y], // 起始位置
          ['L', startPoint.x + slope, startPoint.y], // 向左/向右偏移量
          ['L', line1EndPoint.x + slope, line1EndPoint.y], // 弯曲点的下方/上方坐标
          ['Q', controlPoint.x + slope, controlPoint.y, line2StartPoint.x + slope, line2StartPoint.y], // 弧线坐标
          ['L', endPoint.x, endY], // 目标节点坐标
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

      const { text } = cfg.targetNode.getModel();

      if (text) {
        const line2 = endX > startX ? 50 : -80;

        const label = group.addShape('text', {
          attrs: {
            x:        startPoint.x + (endX > startX ? 20 : -20) + line2,
            y:        endY - 20,
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
