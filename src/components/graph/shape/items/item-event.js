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
    setStyle (node, text, nodeStyle, textStyle) {
        node.attr(nodeStyle);
        if(text) {
            node.attr(textStyle);
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
            group.showAnchor(group);

            this.getAnchorPoints().forEach((p, i) => {
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
     * @description 节点selected事件
     */
    nodeSelected (value, group) {
        const nodeDefault = this.options.$style;
        const textDefault = this.options.nodeLabelStyles;
        const nodeHover = this.options.nodeStateStyles.selected;
        const textHover = this.options.nodeLabelStateStyles.selected;
        const node = group.getChildByIndex(0);
        const text = group.getChildByIndex(1);

        if (value) {
            events.setStyle(node, text, nodeHover, textHover);
        } else {
            events.setStyle(node, text, nodeDefault, textDefault);
        }
    },

    /**
     * @description 节点hover事件
     */
    nodeHover(value, group) {
        const node = group.getChildByIndex(0);
        const text = group.getChildByIndex(1);

        if (value) {
            node.attr('cursor', 'move');
            if(text) {
                text.attr('cursor', 'default');
            }
        } else {
            node.attr('cursor', 'default');
            if(text) {
                text.attr('cursor', 'default');
            }
        }
    },

    /**
     * @description edge hover事件
     */
    edgeHover (value, group) {
        const edge = group.getChildByIndex(0);
        const { endArrow } = edge.get('attrs');

        if (value) {
            edge.attr('stroke', '#1890FF');
            if (endArrow) {
                edge.attr('endArrow', {
                    path: endArrow.path,
                    fill: '#1890FF',
                });
            }
        } else {
            edge.attr('stroke', '#aab7c3');
            if (endArrow) {
                edge.attr('endArrow', {
                    path: endArrow.path,
                    fill: '#aab7c3',
                });
            }
        }
    },

    /**
     * @description edge 选中事件
     */
    edgeSelected (value, group) {
        const edge = group.getChildByIndex(0);
        const { endArrow } = edge.get('attrs');

        if (value) {
            edge.attr({
                stroke:    '#1890FF',
                lineWidth: 2,
            });
            if (endArrow) {
                edge.attr('endArrow', {
                    path: endArrow.path,
                    fill: '#1890FF',
                });
            }
        } else {
            edge.attr({
                stroke:    '#aab7c3',
                lineWidth: 1,
            });
            if (endArrow) {
                edge.attr('endArrow', {
                    path: endArrow.path,
                    fill: '#aab7c3',
                });
            }
        }
    },
};

export default events;
