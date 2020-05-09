/**
 * @author claude
 * @date 2018/3/24
 * @description 通通来自于 behavior 里注册的事件
 */

import defaultStyles from '../defaultStyles';

const { anchorHotsoptStyle } = defaultStyles;

/**
 * @description 恢复节点/边/锚点默认样式
 */
function setStyle (item, nodeStyle, text, textStyle) {
  item.attr(nodeStyle);
  if (text) {
    text.attr(textStyle);
  }
}

function getItemStyle (type, group, state = 'hover') {
  const item = group.get('item');
  const model = item.getModel();
  const originStyle = item.get('originStyle');
  const stateStyle = Object.assign(originStyle, model.edgeStateStyles);
  const activeStyle = stateStyle[`${type}State:${state}`];
  const defaultStyle = stateStyle[`${type}State:default`];

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
          nodeId:    group.get('item').get('id'),
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
      const node = group.getChildByIndex(0);
      const { defaultStyle } = getItemStyle('node', group);

      setStyle(node, defaultStyle);
    }
  },

  /**
   * @description 节点selected事件
   */
  'nodeState:selected' (value, group) {
    const node = group.getChildByIndex(0);
    const { activeStyle, defaultStyle } = getItemStyle('node', group, 'selected');

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
  'nodeState:hover' (value, group) {
    const node = group.getChildByIndex(0);
    const { activeStyle, defaultStyle } = getItemStyle('node', group, 'hover');

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
  'edgeState' (value, group) {
    events[`edgeState:${value}`].call(this, value, group);
  },

  /**
   * @description 边恢复默认状态事件
   */
  'edgeState:default' (value, group) {
    if (value) {
      const { defaultStyle } = getItemStyle('edge', group);
      const edge = group.getChildByIndex(0);

      setStyle(edge, defaultStyle);
    }
  },

  /**
   * @description edge hover事件
   */
  'edgeState:hover' (value, group) {
    const edge = group.getChildByIndex(0);
    const { endArrow } = edge.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle('edge', group, 'hover');

    if (!activeStyle) return;
    if (value) {
      setStyle(edge, activeStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: activeStyle.stroke || originStyle.stroke,
        });
      }
    } else {
      setStyle(edge, defaultStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
        });
      }
    }
  },

  /**
   * @description edge 选中事件
   */
  'edgeState:selected' (value, group) {
    const edge = group.getChildByIndex(0);
    const { endArrow } = edge.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle('edge', group, 'selected');

    if (!activeStyle) return;
    if (value) {
      setStyle(edge, activeStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: activeStyle.stroke || originStyle.stroke,
        });
      }
    } else {
      setStyle(edge, defaultStyle);
      if (endArrow) {
        edge.attr('endArrow', {
          path: endArrow.path,
          fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
        });
      }
    }
  },
};

export default events;
