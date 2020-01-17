export default G6 => {
    G6.registerBehavior('delete-item', {
        getEvents () {
            return {
                'keydown': 'onKeydown',
            };
        },
        onKeydown (e) {
            const items = this.graph.findAllByState('node', 'selectedItems');

            if (e.keyCode === 8 && items && items.length) {

                this.graph.removeChild(items[0]._cfg.id);
                this.graph.set('selectedItems', []);
                // 发射事件
                this.graph.emit('afteritemselected',[]);
            }
        },
    });
};
