
export default G6 => {
  G6.registerBehavior('canvas-event', {
    getDefaultCfg () {
      return {
        offset: [],
      };
    },
    getEvents () {
      return {
        'canvas:mousemove': 'onCanvasMouseMove',
        'canvas:mousedown': 'onCanvasMouseDown',
        'canvas:mouseup':   'onCanvasMouseUp',
        'canvas:dragstart': 'onCanvasDragStart',
        // 'canvas:drag':      'onCanvasDrag',
        'canvas:dragend':   'onCanvasDragEnd',
      };
    },
    onCanvasMouseMove (e) {
      e.target.get('el').style.cursor = 'grab';
    },
    onCanvasMouseDown (e) {
      e.target.get('el').style.cursor = 'grabbing';
    },
    onCanvasMouseUp (e) {
      e.target.get('el').style.cursor = 'grab';
    },
    onCanvasDragStart (e) {
      this.offset = [e.clientX, e.clientY];
    },
    /* onCanvasDrag (e) {}, */
    onCanvasDragEnd (e) {
      e.target.get('el').style.cursor = 'grab';
      this.graph.emit('on-canvas-dragend', e);
    },
  });
};
