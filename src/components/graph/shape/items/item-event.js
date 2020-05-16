/**
 * @author claude
 * @date 2018/3/24
 * @description 通通来自于 behavior 里注册的事件
 */

// import defaultStyles from '../defaultStyles';

/**
 * @description 恢复节点/边/锚点默认样式
 */
function setStyle(item, nodeStyle, text, textStyle) {
  item.attr(nodeStyle);
  if (text) {
    text.attr(textStyle);
  }
}

function getItemStyle(type, group, state = 'hover') {
  const item = group.get('item');
  const attrs = group.getFirst().attr();
  const originStyle = type === 'node' ? item.get('originStyle') : item.get('originStyle')['edge-shape'];
  const activeStyle = attrs[`${type}State:${state}`];
  const defaultStyle = attrs[`${type}State:default`];

  if (type === 'edge' && defaultStyle && defaultStyle.lineWidth == null) {
    defaultStyle.lineWidth = 1;
  }

  return {
    activeStyle,
    defaultStyle,
    originStyle,
  };
}

const events = {
  /**
   * @description 锚点事件
   */
  anchorShow(value, group) {
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
  anchorActived(value, group) {
    if (value) {
      const model = group.get('item').getModel();
      const {
        anchorPoints,
        anchorHotsoptStyles,
      } = model;

      group.showAnchor(group);

      this.getAnchorPoints({ anchorPoints }).forEach((p, i) => {
        const bbox = group.get('children')[0].getBBox();
        // 激活元素
        const hotspot = group.addShape('circle', {
          zIndex: 0,
          attrs:  {
            x:       bbox.minX + bbox.width * p[0],
            y:       bbox.minY + bbox.height * p[1],
            r:       0,
            fill:    '#1890ff',
            opacity: 0.5,
            ...anchorHotsoptStyles,
          },
          nodeId:    group.get('item').get('id'),
          className: 'node-anchor-bg',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });

        // 锚点动画
        hotspot.animate({ r: 11 }, {
          duration: 200,
        });

        group.sort(); // 将group中的元素按照 zIndex 从大到小排序
        group.anchorShapes.push(hotspot);
      });

      group.anchorShapes.filter(item => {
        if (item.get('className') === 'node-anchor') {
          item.toFront();
        }
        if (item.get('className') === 'node-anchor-group') {
          item.attr({
            r: (anchorHotsoptStyles && anchorHotsoptStyles.r || 11) + 2,
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
  nodeState(value, group) {
    events[`nodeState:${value}`].call(this, value, group);
  },

  /**
   * @description 节点恢复默认状态事件
   */
  'nodeState:default'(value, group) {
    if (value) {
      const node = group.getChildByIndex(0);
      const { defaultStyle } = getItemStyle.call(this, 'node', group);

      setStyle(node, defaultStyle);
    }
  },

  /**
   * @description 节点selected事件
   */
  'nodeState:selected'(value, group) {
    const node = group.getChildByIndex(0);
    const { activeStyle, defaultStyle } = getItemStyle.call(this, 'node', group, 'selected');

    if (!activeStyle) return;
    if (value) {
      setStyle(node, activeStyle);
    } else {
      setStyle(node, defaultStyle);
    }
  },

  /**
   * @description 节点hover事件
   */
  'nodeState:hover'(value, group) {
    const node = group.getChildByIndex(0);
    const { activeStyle, defaultStyle } = getItemStyle.call(this, 'node', group, 'hover');

    if (!activeStyle) return;
    if (value) {
      setStyle(node, activeStyle);
    } else {
      setStyle(node, defaultStyle);
    }
  },

  /**
   * @description 边多状态事件
   */
  edgeState(value, group) {
    events[`edgeState:${value}`].call(this, value, group);
  },

  /**
   * @description 边恢复默认状态事件
   */
  'edgeState:default'(value, group) {
    if (value) {
      const { defaultStyle } = getItemStyle.call(this, 'edge', group);
      const edge = group.getChildByIndex(0);

      if (defaultStyle) {
        // 停止内部动画
        this.stopAnimate(group);
        setStyle(edge, defaultStyle);
      }
    }
  },

  /**
   * @description edge hover事件
   */
  'edgeState:hover' (value, group) {
    const path = group.getChildByIndex(0);
    const { endArrow } = path.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle.call(this, 'edge', group, 'hover');

    if (!activeStyle) return;
    if (value) {
      if (activeStyle.animate === true) {
        this.runAnimate(group);
      } else if (typeof activeStyle.animate === 'function') {
        activeStyle.animate(group);
      } else {
        setStyle(path, activeStyle);
        if (endArrow) {
          path.attr('endArrow', {
            path: endArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    } else {
      if (activeStyle.animate === true) {
        // 停止动画
        this.stopAnimate(group);
      } else if (typeof activeStyle.animate === 'function') {
        activeStyle.animate(group, 'stop');
      } else {
        setStyle(path, defaultStyle);
        if (endArrow) {
          path.attr('endArrow', {
            path: endArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    }
  },

  /**
   * @description edge 选中事件
   */
  'edgeState:selected'(value, group) {
    const path = group.getChildByIndex(0);
    const { endArrow } = path.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle.call(this, 'edge', group, 'selected');

    if (!activeStyle) return;
    if (value) {
      if (activeStyle.animate === true) {
        // 执行内部动画
        this.runAnimate(group);
      } else if (typeof activeStyle.animate === 'function') {
        // 执行外部动画
        activeStyle.animate(group);
      } else {
        setStyle(path, activeStyle);
        if (endArrow) {
          path.attr('endArrow', {
            path: endArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    } else {
      if (activeStyle.animate === true) {
        // 停止内部动画
        this.stopAnimate(group);
      } else if (typeof activeStyle.animate === 'function') {
        // 停止外部动画
        activeStyle.animate(group, 'stop');
      } else {
        setStyle(path, defaultStyle);
        if (endArrow) {
          path.attr('endArrow', {
            path: endArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    }
  },
};

export default events;
