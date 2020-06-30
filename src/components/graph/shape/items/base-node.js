/**
 * @author claude
 * @date 2020/3/15
 * @description 注册基础节点, 其他节点都在此基础上继承和扩展
 */

import itemEvents from './item-event';
import anchorEvent from './anchor-event';

/*
 * 注册基础node => 添加锚点/图标 => 绘制node => 初始化node状态 => node动画(设置交互动画)
 */
export default G6 => {
  G6.registerNode('base-node', {
    // 绘制图标
    drawIcon (cfg, group, attrs) {
      const { logoIcon, stateIcon } = attrs;

      if (logoIcon && logoIcon.show) {
        const icon = group.addShape(logoIcon.img ? 'image' : 'text', {
          attrs: {
            ...logoIcon,
            ...logoIcon.style,
          },
          className: `${attrs.type}-icon`,
          draggable: true,
        });

        icon.toFront();
      }

      if (stateIcon && stateIcon.show) {
        const icon = group.addShape(stateIcon.img ? 'image' : 'text', {
          attrs: {
            ...stateIcon,
            ...stateIcon.style,
          },
          className: `${attrs.type}-icon`,
          draggable: true,
        });

        icon.toFront();
      }
    },
    // 绘制锚点
    initAnchor (cfg, group) {
      group.anchorShapes = [];
      group.showAnchor = group => {
        this.drawAnchor(cfg, group);
      };
      group.clearAnchor = group => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
        group.anchorShapes = [];
      };
    },
    drawAnchor (cfg, group) {
      const { type, direction, anchorPointStyles } = group.getFirst().attr();
      const item = group.get('children')[0];
      const bBox = item.getBBox();
      const anchors = this.getAnchorPoints(cfg);

      // 绘制锚点坐标
      anchors && anchors.forEach((p, i) => {
        const diff = type === 'triangle-node' ? (direction === 'up' ? 1 : 0) : 0.5;
        const x = bBox.width * (p[0] - 0.5);
        const y = bBox.height * (p[1] - diff);

        /**
         * 绘制三层锚点
         * 最底层: 锚点bg
         * 中间层: 锚点
         * 最顶层: 锚点group, 用于事件触发
         */
        // 视觉锚点
        const anchor = group.addShape('circle', {
          attrs: {
            x,
            y,
            ...anchorPointStyles,
          },
          zIndex:    1,
          nodeId:    group.get('id'),
          className: 'node-anchor',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });

        // 锚点事件触发的元素
        const anchorGroup = group.addShape('circle', {
          attrs: {
            x,
            y,
            r:       11,
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
    addLabel (cfg, group, attrs) {
      const { label, labelCfg, labels } = attrs;

      // 字体小于12时 svg会报错
      /* if (labelCfg && labelCfg.fontSize < 12) {
        labelCfg.fontSize = 12;
      } */

      // 多行文本
      if (labels) {
        labels.forEach(item => {
          const { label, labelCfg: { maxlength }, className } = item;

          let text = maxlength ? label.substr(0, maxlength) : label || '';

          if (label.length > maxlength) {
            text = `${text}...`;
          }

          group.addShape('text', {
            attrs: {
              text,
              ...item,
              ...item.labelCfg,
            },
            className: `node-text ${className}`,
            draggable: true,
          });
        });
      } else if (label) {
        const { maxlength } = labelCfg;

        let text = maxlength ? label.substr(0, maxlength) : label || '';

          if (label.length > maxlength) {
            text = `${text}...`;
          }

          group.addShape('text', {
            attrs: {
              text,
              x: 0,
              y: 0,
              ...label,
              ...labelCfg,
            },
            className: 'node-text',
            draggable: true,
          });
      }
    },
    drawModelRect (group, attrs) {
      const { preRect, width, height } = attrs;
      const $preRect = {
        show:   true, // 是否显示左侧方条
        width:  4,
        fill:   '#40a9ff',
        radius: 2,
      };

      if (!preRect || preRect.show !== false) {
        group.addShape('rect', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            height,
            ...$preRect,
            ...preRect,
          },
          draggable: true,
        });
      }
    },
    /* 绘制节点，包含文本 */
    draw (cfg, group) { // 元素分组
      // 合并外部样式和默认样式
      const attrs = this.getShapeStyle(cfg, group);
      // 添加节点
      const shape = group.addShape(this.shapeType, { // shape 属性在定义时返回
        className: `${this.shapeType}-shape`,
        draggable: true,
        attrs,
      });

      // 按className查找元素
      group.getItem = className => {
        return group.get('children').find(item => item.get('className') === className);
      };

      if (this.shapeType === 'modelRect-node') {
        this.drawModelRect(group, attrs);
      }
      // 添加文本节点
      this.addLabel(cfg, group, attrs);
      // 添加图标
      this.drawIcon(cfg, group, attrs);
      // 添加锚点
      this.initAnchor(cfg, group);

      return shape;
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
    getAnchorPoints (cfg) {
      return cfg.anchorPoints || [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5],
      ];
    },
  }, 'single-node');
};
