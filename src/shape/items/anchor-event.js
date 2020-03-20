/**
 * @author claude
 * @date 2020/02/24
 * @description 锚点事件
 */

export default (anchor, group, p) => {

    anchor.on('mouseenter', () => {
        anchor.attr({
            cursor: 'crosshair',
        });
    });

    // 拖拽事件
    anchor.on('dragstart', e => {
        const { bboxCache: bbox, model: { style } } = group.get('item')._cfg;
        const lineWidth = (style.lineWidth || 0) / 2;
        const point = [bbox.width * p[0] - lineWidth, bbox.height * p[1] - lineWidth];

        // 添加线条
        const line= group.addShape('path', {
            attrs: {
                zIndex:          1,
                lineCap:         'round',
                stroke:          '#1890FF',
                lineWidth:       1,
                lineAppendWidth: 5,
                lineDash:        [5, 5],
                path:            [
                    ['M', point[0], point[1]],
                    ['L', point[0], point[1]],
                ],
                x: 0,
                y: 0,
            },
            className: 'dashed-line',
        });

        // 置于顶层
        group.toFront();
        line.toFront();
    });

    anchor.on('drag', e => {
        const bbox = group.get('children')[0].cfg.canvasBox;
        const item = group.getItem('dashed-line');

        /* item.attr({
            path: [
                ['M', -10, -11],
                ['L', e.x - bbox.x - bbox.width / 2, e.y - bbox.y - bbox.height / 2],
            ],
        }); */
    });

    anchor.on('dragend', e => {
        const item = group.getItem('dashed-line');

        item.remove();

        console.log('end', e.x, e.y);

    });
};
