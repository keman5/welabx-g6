export default G6 => {
    G6.registerBehavior('dragNode', {
        getEvents () {
            return {
                'node:dragstart': 'onDragStart',
                'node:drag':      'onDrag',
                'node:dragend':   'onDragEnd',
            };
        },
        // 拖拽开始
        onDragStart (e) {
            console.log(e);

            this.target = e.item;
            this.origin = {
                x: e.x,
                y: e.y,
            };
        },
        // 拖拽中
        onDrag (e) {
            const model = this.target.get('model');

            console.log(e);

            this.point = { x: model.x, y: model.y };
        },
        // 拖拽结束
        onDragEnd (e) {

        },
    });
};
