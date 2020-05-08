/**
 * @author claude
 * @date 2018/3/24
 * @description 通通来自于 behavior 里注册的事件
 */

import defaultStyles from '../defaultStyles';

const { anchorHotsoptStyle } = defaultStyles;

const events = {
  /**
   * @description 恢复节点/边/锚点默认样式
   */
  setStyle (item, text, nodeStyle, textStyle) {
    item.attr(nodeStyle);
    if (text) {
      text.attr(textStyle);
    }
  },

  /**
   * @description 锚点事件
  */
  anchorShow (value, group) {
    // 显示/隐藏锚点
    if (value) {
      group.showAnchor(group);
    } else {
      group.clearAnchor(group);
    }
  },

  /**
   * @description 锚点激活事件
   */
  anchorActived (value, group) {
    if (value) {
      const { anchorPoints } = group.get('item').getModel();

      group.showAnchor(group);

      this.getAnchorPoints({ anchorPoints }).forEach((p, i) => {
        const bbox = group.get('children')[0].getBBox();
        const anchorBg = group.addShape('circle', {
          attrs: {
            x:       bbox.minX + bbox.width * p[0],
            y:       bbox.minY + bbox.height * p[1],
            r:       anchorHotsoptStyle.radius,
            fill:    '#1890ff',
            opacity: 0.5,
          },
          nodeId:    group.get('item')._cfg.id,
          className: 'node-anchor-bg',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });

        group.anchorShapes.push(anchorBg);
      });

      group.anchorShapes.filter(item => {
        if (item.get('className') === 'node-anchor') {
          item.toFront();
        }
        if (item.get('className') === 'node-anchor-group') {
          item.attr({
            r: anchorHotsoptStyle.radius + 2,
            // opacity: 0.2,
          });
          item.toFront();
        }
      });
    } else {
      // 移除
      group.clearAnchor(group);
    }
  },

  /**
   * @description 边多状态事件
   */
  'nodeState' (value, group) {
    events[`nodeState:${value}`].call(this, value, group);
  },

  /**
   * @description 节点恢复默认状态事件
   */
  'nodeState:default' (value, group) {
    if (value) {
      const nodeDefault = this.options['nodeState:default'];
      // const textDefault = this.options.labelCfg;
      const node = group.getChildByIndex(0);
      const text = group.getChildByIndex(1);

      events.setStyle(node, text, nodeDefault);
    }
  },

  /**
   * @description 节点selected事件
   */
  'nodeState:selected' (value, group) {
    const nodeActive = this.options['nodeState:selected'];
    // const textActive = this.options.labelCfg;
    const node = group.getChildByIndex(0);
    const text = group.getChildByIndex(1);

    events.setStyle(node, text, nodeActive);
  },

  /**
   * @description 节点hover事件
   */
  'nodeState:hover' (value, group) {
    const nodeActive = this.options['nodeState:hover'];
    // const textActive = this.options.labelCfg;
    const node = group.getChildByIndex(0);
    const text = group.getChildByIndex(1);

    if (value) {
      events.setStyle(node, text, nodeActive);
    } else {
      events.setStyle(node, null, group.get('item').get('originStyle'));
    }
  },

  /**
   * @description 边多状态事件
   */
  'edgeState' (value, group) {
    events[`edgeState:${value}`].call(this, value, group);
  },

  /**
   * @description 边恢复默认状态事件
   */
  'edgeState:default' (value, group) {
    if (value) {
      const edge = group.getChildByIndex(0);
      const text = group.getChildByIndex(1);
      const edgeDefault = this.options['edgeState:default'];
      const textDefault = this.options['edgeLabelState:default'];

      events.setStyle(edge, text, edgeDefault, textDefault);
    }
  },

  /**
   * @description edge hover事件
   */
  'edgeState:hover' (value, group) {
    const edgeActive = this.options['edgeState:hover'];
    // const textActive = this.options.labelCfg;
    const edge = group.getChildByIndex(0);
    const text = group.getChildByIndex(1);
    const { endArrow } = edge.get('attrs');
    const originStyle = group.get('item').get('originStyle');

    if (value) {
      events.setStyle(edge, text, edgeActive);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: edgeActive.stroke || '#1890FF',
        });
      }
    } else {
      events.setStyle(edge, null, originStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: originStyle.stroke || '#1890FF',
        });
      }
    }
  },

  /**
   * @description edge 选中事件
   */
  'edgeState:selected' (value, group) {
    const edgeActive = this.options['edgeState:selected'];
    const edge = group.getChildByIndex(0);
    const text = group.getChildByIndex(1);
    const { endArrow } = edge.get('attrs');
    const originStyle = group.get('item').get('originStyle');

    if (value) {
      events.setStyle(edge, text, edgeActive);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: edgeActive.stroke || '#1890FF',
        });
      }
    } else {
      events.setStyle(edge, null, originStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: originStyle.stroke || '#1890FF',
        });
      }
    }
  },
};

export default events;
