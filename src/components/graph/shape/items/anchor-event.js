/**
 * @author claude
 * @date 2020/02/24
 * @description 锚点事件
 */

let dragLog = []; // 记录鼠标坐标

let anchorNodeId = null; // dragover 也会发生在拖拽的锚点上, 用于记录当前拖拽的节点id

export default (anchor, group, p) => {
  // 鼠标移入事件
  anchor.on('mouseenter', () => {
    // 可以传入多个键值对
    anchor.attr({
      cursor: 'crosshair',
    });
  });

  // 拖拽事件
  anchor.on('dragstart', e => {
    if (anchorNodeId == null) {
      const bBox = group.get('item').getBBox();
      const id = group.get('item').get('id');
      const point = [
        bBox.width * (p[0] - 0.5), // x
        bBox.height * (p[1] - 0.5), // y
      ];

      dragLog = [e.x, e.y];

      // 添加线条
      const line = group.addShape('path', {
        attrs: {
          stroke:   '#1890FF',
          lineDash: [5, 5],
          path:     [
            ['M', ...point],
            ['L', ...point],
          ],
        },
        className:  'dashed-line',
        pointStart: point,
      });

      // 置于顶层
      group.toFront();
      line.toFront(); // 最后把这条线层级提升至最高
      anchorNodeId = id;
    }
  });

  // 拖拽中
  anchor.on('drag', e => {
    const canvasBox = group.get('children')[0].get('canvasBox');
    const line = group.getItem('dashed-line');
    const pointStart = line.get('pointStart');
    const endPoint = [e.x - canvasBox.x - canvasBox.width / 2, e.y - canvasBox.y - canvasBox.height / 2];

    line.toFront();
    /**
     * 计算方法:
     * 鼠标位置 - box左上角 - width/2 => 中心坐标
     * 这里 1px 是为了让鼠标释放时 node: drag 事件监听到 target, 而不是当前虚线
     */

    // 如果鼠标移动距离超过 10px 就开始计算角度
    if (Math.sqrt(Math.pow(Math.abs(dragLog[0]) - Math.abs(e.x), 2) + Math.pow(Math.abs(dragLog[1]) - Math.abs(e.y), 2)) >= 10) {
      if (e.x >= dragLog[0]) {
        // 右下
        if (e.y >= dragLog[1]) {
          endPoint[0] -= 1;
          endPoint[1] -= 1;
        } else {
          // 右上
          endPoint[0] -= 1;
          endPoint[1] -= 1;
        }
      } else {
        // 左上
        if (e.y >= dragLog[1]) {
          endPoint[0] += 1;
          endPoint[1] += 1;
        } else {
          // 左下
          endPoint[0] += 1;
          endPoint[1] += 1;
        }
      }
    }

    line.attr({
      path: [
        ['M', ...pointStart],
        ['L', endPoint[0], endPoint[1]],
      ],
    });
  });

  // 拖拽结束删除虚线
  anchor.on('dragend', e => {
    const item = group.getItem('dashed-line');

    item.remove();
    anchorNodeId = null;
  });

  // 拖拽到其他锚点上
  anchor.on('dragenter', e => {
    // 排除相同节点的锚点
    if (e.target.cfg.nodeId !== anchorNodeId) {
      const { index } = e.target.cfg;

      if (group.getAllAnchorBg()[index]) {
        group.getAllAnchorBg()[index].attr('fillOpacity', 0.7);
      }
    }
  });

  // 拖拽离开事件
  anchor.on('dragleave', e => {
    // 排除相同节点的锚点
    if (e.target.cfg.nodeId !== anchorNodeId) {
      const { index } = e.target.cfg;

      if (group.getAllAnchorBg()[index]) {
        group.getAllAnchorBg()[index].attr('fillOpacity', 0.5);
      }
    }
  });

  // ! 在锚点上释放见node监听事件
};
