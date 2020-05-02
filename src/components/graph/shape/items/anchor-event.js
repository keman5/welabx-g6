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
            // 先刷新当前节点的位置, 否则拖拽画布会发生位置错误
            group.get('item').refresh();

            const { r } = anchor.get('attrs');
            const cacheCanvasBBox = group.get('cacheCanvasBBox');
            const { id, model: { style } } = group.get('item')._cfg;
            const lineWidth = (style.lineWidth || 0) / 2;
            const point = [(cacheCanvasBBox.width - r * 4 - 1) * (p[0] - 0.5) - lineWidth, (cacheCanvasBBox.height - r * 4 - 1) * (p[1] - 0.5) - lineWidth];

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
        const bboxCache = group.get('item').getBBox(); // 这里要注意有缓存
        const line = group.getItem('dashed-line');
        const pointStart = line.get('pointStart');

        line.toFront();
        /**
         * 计算方法:
         * 鼠标位置 - box左上角 - width/2 => 中心坐标
         * 这里减 1px 是为了让鼠标释放时 node: drag 事件监听到 target, 而不是当前虚线
         */
        line.attr({
            path: [
                ['M', ...pointStart],
                ['L', e.x - bboxCache.x - bboxCache.width / 2 - 1, e.y - bboxCache.y - bboxCache.height / 2 - 1],
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
