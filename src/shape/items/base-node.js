/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础节点, 其他节点都在此基础上继承和扩展
 */

import itemEvents from './item-event';
import anchorEvent from './anchor-event';
import defaultStyles from '../../utils/defaultStyles';

const { nodeStateStyles, nodeLabelStateStyles } = defaultStyles;

/*
 * flow:
 * 注册基础node => 添加锚点/图标 => 绘制node => 初始化node状态 => node动画(设置交互动画)
 */

export default G6 => {
    const { Util } = G6;

    G6.registerNode('base-node', {
        // 绘制图标
        drawIcon (cfg, group) {
            if (this.options.icon) {
                group.icon = group.addShape('image', {
                    attrs: {
                        img:    this.options.icon,
                        x:      this.options.iconStyles.left,
                        y:      this.options.iconStyles.top,
                        width:  this.options.iconStyles.width,
                        height: this.options.iconStyles.height,
                    },
                    className: `${this.options.type}-icon`,
                });

                if(cfg.hideIcon){
                    group.icon.hide();
                }
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
            const { anchorPointStyles } = this.options;
            const bbox = group.get('children')[0].getBBox();

            // 绘制锚点坐标
            this.getAnchorPoints().forEach((p, i) => {
                const anchor = group.addShape('circle', {
                    attrs: {
                        x: bbox.minX + bbox.width * p[0],
                        y: bbox.minY + bbox.height * p[1],
                        ...anchorPointStyles,
                    },
                    nodeId:    group.get('item')._cfg.id,
                    className: 'node-anchor',
                    draggable: true,
                    isAnchor:  true,
                    index:     i,
                });

                /**
                 * ! 添加锚点事件绑定
                 */
                anchorEvent(anchor, group, p);

                group.anchorShapes.push(anchor);
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
        addLabel (cfg, group) {
            if (cfg.label) {
                const { type, labelCfg } = this.options;

                // 字体小于12时 svg会报错
                if (labelCfg && labelCfg.fontSize < 12) {
                    labelCfg.fontSize = 12;
                }

                group.addShape('text', {
                    attrs: {
                        text: cfg.label,
                        ...labelCfg,
                    },
                    className: `${type}-text`,
                    name:      `${type}-text`,
                    draggable: true,
                });

                // ! 添加事件绑定
                /* label.on('click', () => {
                    console.log('text');
                });
                label.on('mouseenter', () => {
                    console.log('text');
                });

                label.on('dragstart', () => {
                    console.log('dragstart');
                }); */
            }
        },
        /* 绘制节点，包含文本 */
        draw (cfg, group) {
            const shapeName = this.shapeType || 'rect';
            // 合并外部样式和默认样式
            const attrs = Util.deepMix({}, this.getShapeStyle(cfg), cfg);

            // 添加节点
            const shape = group.addShape(shapeName, {
                attrs: {
                    ...attrs.style,
                    labelCfg: attrs.labelCfg,
                },
                className: `${shapeName}-shape`,
                draggable: true,
            });

            this.options = {
                labelCfg: {
                    style: {},
                },
                nodeStateStyles,
                nodeLabelStateStyles,
                ...attrs,
            };

            // 添加文本节点
            this.addLabel(cfg, group);

            // 添加图标
            this.drawIcon(cfg, group);
            // 添加锚点
            this.initAnchor(cfg, group);
            // 默认不显示
            // this.drawAnchor(cfg, group);

            return shape;
        },
        // 动画函数
        runAnimate (cfg, group) {
            if (cfg.active) {
                //
            }
        },
        /* 绘制后的附加操作，默认没有任何操作 */
        afterDraw (cfg, group) {
            group.getItem = className => {
                return group.get('children').find(item => item.get('className') === className);
            };

            this.runAnimate(cfg, group);
        },
        /* 更新节点，包含文本 */
        update (cfg, node) {

        },
        /* 更新节点后的操作，同 afterDraw 配合使用 */
        afterUpdate (cfg, group) {
            // 显示/隐藏图标
            const icon = group.get('group').icon;

            if (icon) {
                if(cfg.hideIcon && icon.get('visible')){
                    icon.hide();
                }else if(!cfg.hideIcon && !icon.get('visible')){
                    icon.show();
                }
            }
        },
        /* 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现 */
        setState (name, value, item) {
            const buildInEvents = [
                'anchorShow',
                'anchorActived',
                'selected',
                'nodeHover',
                'edgeHover',
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
            // 执行自定义状态回调
            this.customStateCall(name, value, item);
        },
        customStateCall (name, value, item) {},
        /* 获取锚点（相关边的连入点） */
        getAnchorPoints (cfg) {
            return [
                [0.5, 0], // top
                [1, 0.5], // right
                [0.5, 1], // bottom
                [0, 0.5], // left
            ];
        },
    }, 'single-node');
};
