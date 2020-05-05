/**
 * @author claude
 * @date 2020/02/24
 * @description 锚点事件
 */

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
    anchor.on('dragstart', () => {
        if (anchorNodeId == null) {
            const { r } = anchor.get('attrs');
            const cacheCanvasBBox = group.get('cacheCanvasBBox');
            const { id, model: { style } } = group.get('item')._cfg;
            const lineWidth = (style.lineWidth || 0) / 2;
            const point = [(cacheCanvasBBox.width - r * 2 - 4) * (p[0] - 0.5) - lineWidth, (cacheCanvasBBox.height - r * 2 - 4) * (p[1] - 0.5) - lineWidth];

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
            line.toFront();
            anchorNodeId = id;
        }
    });

    // 拖拽中
    anchor.on('drag', e => {
        const canvasBox = group.get('children')[0].get('canvasBox');
        const line = group.getItem('dashed-line');
        const pointStart = line.get('pointStart');

        line.toFront();
        /**
         * 计算方法:
         * 鼠标位置 - box左上角 - width/2 => 中心坐标
         * 这里减 2px 是为了让鼠标释放时 node: drag 事件监听到 target, 而不是当前虚线
         */
        line.attr({
            path: [
                ['M', ...pointStart],
                ['L', e.x - canvasBox.x - canvasBox.width / 2 - 2, e.y - canvasBox.y - canvasBox.height / 2 - 2],
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

            if (index && group.getAllAnchorBg()[index]) {
                group.getAllAnchorBg()[index].attr('fillOpacity', 0.7);
            }
        }
    });

    // 拖拽离开事件
    anchor.on('dragleave', e => {
        // 排除相同节点的锚点
        if (e.target.cfg.nodeId !== anchorNodeId) {
            const { index } = e.target.cfg;

            if (index && group.getAllAnchorBg()[index]) {
                group.getAllAnchorBg()[index].attr('fillOpacity', 0.5);
            }
        }
    });

    // ! 在锚点上释放见node监听事件
};
