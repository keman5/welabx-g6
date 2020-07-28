
export default G6 => {
  G6.registerBehavior('canvas-event', {
    getDefaultCfg () {
      return {
        originOffset: [],
        offset:       [],
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
      const { el } = e.target.cfg;
      const dx = +el.getAttribute('dx');
      const dy = +el.getAttribute('dy');

      this.originOffset = [dx, dy];
      this.offset = [e.clientX, e.clientY];
    },
    /* onCanvasDrag (e) {}, */
    onCanvasDragEnd (e) {
      e.target.get('el').style.cursor = 'grab';
      const { el } = e.target.cfg;
      const dx = this.originOffset[0] + e.clientX - this.offset[0];
      const dy = this.originOffset[1] + e.clientY - this.offset[1];

      el.setAttribute('dx', dx);
      el.setAttribute('dy', dy);
      this.graph.emit('on-canvas-dragend', {
        ...e,
        dx,
        dy,
      });
    },
  });
};
