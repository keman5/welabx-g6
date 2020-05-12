/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础节点, 其他节点都在此基础上继承和扩展
 */

import itemEvents from './item-event';
import anchorEvent from './anchor-event';
import defaultStyles from '../defaultStyles';

const {
  anchorHotsoptStyle,
} = defaultStyles;

/*
 * 注册基础node => 添加锚点/图标 => 绘制node => 初始化node状态 => node动画(设置交互动画)
 */

export default G6 => {
  G6.registerNode('base-node', {
    // 绘制图标
    drawIcon (group) {
      if (this.attrs.icon) {
        const iconStyles = {
          ...this.attrs.iconStyles,
        };

        group.icon = group.addShape('image', {
          attrs: {
            img:    this.attrs.icon,
            x:      iconStyles.left,
            y:      iconStyles.top,
            width:  iconStyles.width,
            height: iconStyles.height,
          },
          className: `${this.attrs.type}-icon`,
        });

        if (this.attrs.hideIcon) {
          group.icon.hide();
        }
      }
    },
    // 绘制锚点
    initAnchor (group) {
      group.anchorShapes = [];
      group.showAnchor = group => {
        this.drawAnchor(group);
      };
      group.clearAnchor = group => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
        group.anchorShapes = [];
      };
    },
    drawAnchor (group) {
      const { anchorPointStyles } = this.attrs;
      const item = group.get('children')[0];
      const bbox = item.getBBox();

      // 绘制锚点坐标
      this.getAnchorPoints(this.attrs).forEach((p, i) => {
        /**
         * 绘制三层锚点
         * 最底层: 锚点bg
         * 中间层: 锚点
         * 最顶层: 锚点group, 用于事件触发
         */
        const anchor = group.addShape('circle', {
          attrs: {
            x: bbox.minX + bbox.width * p[0],
            y: bbox.minY + bbox.height * p[1],
            ...anchorPointStyles,
          },
          zIndex:    1,
          nodeId:    group.get('id'),
          className: 'node-anchor',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });

        const anchorGroup = group.addShape('circle', {
          attrs: {
            x:       bbox.minX + bbox.width * p[0],
            y:       bbox.minY + bbox.height * p[1],
            r:       anchorHotsoptStyle.radius,
            fill:    '#000',
            opacity: 0,
          },
          zIndex:    2,
          nodeId:    group.get('id'),
          className: 'node-anchor-group',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });

        /**
         * ! 添加锚点事件绑定
         */
        anchorEvent(anchorGroup, group, p);

        group.anchorShapes.push(anchor);
        group.anchorShapes.push(anchorGroup);
      });

      // 查找所有锚点
      group.getAllAnchors = () => {
        return group.anchorShapes.filter(c => c.get('isAnchor') === true);
      };
      // 查找指定锚点
      group.getAnchor = (i) => {
        return group.anchorShapes.filter(c => c.get('className') === 'node-anchor' && c.get('index') === i);
      };
      // 查找所有锚点背景
      group.getAllAnchorBg = () => {
        return group.anchorShapes.filter(c => c.get('className') === 'node-anchor-bg');
      };
    },
    /* 添加文本节点 */
    /* https://g6.antv.vision/zh/docs/manual/advanced/keyconcept/shape-and-properties/#%E6%96%87%E6%9C%AC-text */
    addLabel (group) {
      const { label, labelCfg } = this.attrs;

      if (label) {
        // 字体小于12时 svg会报错
        /* if (labelCfg && labelCfg.fontSize < 12) {
          labelCfg.fontSize = 12;
        } */

        group.addShape('text', {
          attrs: {
            x:    0,
            y:    0,
            text: label,
            ...labelCfg,
          },
          className: 'node-text',
          draggable: true,
        });
      }
    },
    /* 绘制节点，包含文本 */
    draw (cfg, group) {
      // 合并外部样式和默认样式
      this.attrs = this.getShapeStyle(cfg);

      // 添加节点
      const shape = group.addShape(this.shapeType, {
        className: `${this.shapeType}-shape`,
        attrs:     this.attrs, // shape 属性在定义时返回
        draggable: true,
      });

      // 按className查找元素
      group.getItem = className => {
        return group.get('children').find(item => item.get('className') === className);
      };
      // 添加文本节点
      this.addLabel(group);

      // 添加图标
      this.drawIcon(group);
      // 添加锚点
      this.initAnchor(group);
      // 默认不显示
      // this.drawAnchor(group);

      return shape;
    },
    // 动画函数
    runAnimate (group) {
      if (this.attrs.runAnimate) {
        //
      }
    },
    /* 绘制后的附加操作，默认没有任何操作 */
    afterDraw (cfg, group) {
      this.runAnimate(group);
    },
    /* 更新节点，包含文本 */
    update (cfg, node) {
      const model = node.get('model');
      const { attrs } = node.get('keyShape');
      const text = node.get('group').getItem('node-text');
      const item = node.get('group').get('children')[0];

      setTimeout(() => {
        // 更新文本内容
        text && text.attr({
          text:     model.label,
          labelCfg: attrs.labelCfg,
        });
        // 更新节点属性
        item.attr({ ...attrs, ...model.style });
      });
    },
    /* 更新节点后的操作，同 afterDraw 配合使用 */
    afterUpdate (cfg, node) {
      // 显示/隐藏图标
      const icon = node.get('group').icon;

      if (icon) {
        if (this.attrs.hideIcon && icon.get('visible')) {
          icon.hide();
        } else if (!this.attrs.hideIcon && !icon.get('visible')) {
          icon.show();
        }
      }
    },
    /* 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现 */
    setState (name, value, item) {
      const buildInEvents = [
        'anchorShow',
        'anchorActived',
        'nodeState',
        'nodeState:default',
        'nodeState:selected',
        'nodeState:hover',
        'nodeOnDragStart',
        'nodeOnDrag',
        'nodeOnDragEnd',
      ];
      const group = item.getContainer();

      if (buildInEvents.includes(name)) {
        // 内部this绑定到了当前item实例
        itemEvents[name].call(this, value, group);
      } else {
        console.warn(`warning: ${name} 事件回调未注册!`);
      }
    },
    /* 获取锚点（相关边的连入点） */
    getAnchorPoints () {
      return this.attrs.anchorPoints || [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5],
      ];
    },
  }, 'single-node');
};
