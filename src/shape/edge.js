/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import itemEvents from './items/item-event';
import defaultStyles from '../utils/defaultStyles';

const { edgeStyles } = defaultStyles;

// 可点坐标
/* const dashCorner = [
    [0, 0],
]; */

/*
 * flow:
 * 注册基础edge => 绘制edge => 初始化edge状态 => dege动画(设置交互动画)
 */

export default G6 => {
    G6.registerEdge('base-edge', {
        /* 绘制文本 */
        drawLabel (cfg, group) {
            const { startPoint, endPoint } = cfg;
            const { labelCfg } = this.options;

            /* group.addShape('rect', {
                attrs: {
                    x:      startPoint.x,
                    y:      startPoint.y,
                    width:  endPoint.x - startPoint.x,
                    height: 20,
                    text:   cfg.label,
                    ...labelCfg,
                },
                className: 'edge-label',
            }); */

            group.addShape('text', {
                attrs: {
                    x:      startPoint.x + 20,
                    y:      startPoint.y - 5,
                    width:  endPoint.x - startPoint.x,
                    height: 20,
                    fill:   '#666',
                    text:   cfg.label,
                    ...labelCfg,
                },
                className: 'edge-label',
            });
        },
        /* 绘制节点，包含文本 */
        drawShape (cfg, group) {
            const { sourceNode, targetNode, startPoint, endPoint } = cfg;
            const stroke = (cfg.style && cfg.style.stroke) || edgeStyles.stroke;
            const lineAppendWidth = (cfg.style && cfg.style.lineAppendWidth) || edgeStyles.lineAppendWidth;
            // const startArrow = (cfg.style && cfg.style.startArrow) || edgeStyles.startArrow;
            const endArrow = (cfg.style && cfg.style.endArrow) || edgeStyles.endArrow;

            const path = this._getPath(sourceNode, targetNode, startPoint, endPoint);
            const keyShape = group.addShape('path', {
                attrs: {
                    path,
                    stroke,
                    lineWidth: 1,
                    lineAppendWidth,
                    // startArrow,
                    endArrow,
                },
                className: 'base-edge',
            });

            // 绘制文本
            this.drawLabel(cfg, group);

            return keyShape;
        },
        setState (name, value, item) {
            const buildInEvents = [
                'edgeHover',
                'edgeSelected',
            ];
            const group = item.getContainer();

            if (buildInEvents.includes(name)) {
                // 内部this绑定到了当前item实例
                itemEvents[name].call(this, value, group);
            } else {
                console.warn(`warning: edge ${name} 事件回调未注册!`);
            }
            // 执行自定义状态回调
            this.customStateCall(name, value, item);
        },
        customStateCall (name, value, item) { },

        // 获取锚点坐标
        _getControlPoints (cfg) {

        },
        /**
         * @description 根据位置计算线条拐点
         * path 参见 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
         * M: Move To       ['M', x, y]
         * L: Line To       ['L', x, y]
         * Q: 二次贝塞尔曲线  ['Q', x1, y1, x, y] (x1, y1): 圆弧中心坐标 (x, y) 圆弧终点坐标
         * 实现效果: 在距结束箭头10个单位处弯曲, 反推折点坐标, 多处弯曲取中间点
         */
        _getPath (sNode, tNode, s, e) {
            const sBbox = sNode.getBBox();
            const eBbox = tNode.getBBox();
            const radius = 5; // 每个圆弧的半径
            const path = [];

            // console.log(tNode.get('id'), s.x, e.x);

            path.push(['M', s.x, s.y]); // 推入起点坐标
            // 这里开始计算中间折线的坐标
            if (e.x !== s.x) {
                if (e.y > s.y) {
                    // ↓ 向下
                    /* (e.x > s.x) => 向右 */
                    const Q1x1 = s.x;

                    let Q1y1 = 0, Qx = 0, Qy = 0;

                    if (s.y === sBbox.centerY - sBbox.height / 2) {
                        // 上
                        Q1y1 = s.y - radius;
                        Qx = s.x;
                        Qy = Q1y1;
                    } else if (s.x === sBbox.centerX + sBbox.width / 2) {
                        // 右
                        Q1y1 = s.y;
                        Qx = s.x;
                        Qy = s.y;
                    } else if (s.y === sBbox.centerY + sBbox.height / 2) {
                        // 下
                        Q1y1 = s.y + radius;
                        Qx = s.x;
                        Qy = Q1y1;
                    } else {
                        // 左
                        Q1y1 = s.y;
                        Qx = s.x;
                        Qy = s.y;
                    }
                    // path.push(['L', Qx, Qy]);

                    path.push(['Q', Q1x1, Q1y1, Qx, Qy]); // 距离起始坐标第1个弧线
                    if (e.x > s.x) {
                        // 向右
                        if (e.x === eBbox.centerX - eBbox.width / 2) {
                            // 指向最左边的位置 需要加个折点
                            path.push(['L', e.x - radius * 5, Qy]);
                            path.push(['Q', e.x - radius * 4, Qy, e.x - radius * 4, Qy + radius]);
                            path.push(['L', e.x - radius * 4, e.y - radius]);
                            // 距离目标最近的圆弧
                            path.push(['Q', e.x - radius * 4, e.y, e.x - radius * 3, e.y]);
                        } else {
                            path.push(['L', e.x - radius, Qy]);
                            path.push(['Q', e.x, Q1y1, e.x, Qy + radius]);
                        }
                    } else {
                        // 向左
                        if (e.y === eBbox.centerY - eBbox.height / 2) {
                            // 指向最上面的锚点
                            path.push(['L', e.x + radius, Qy]);
                            path.push(['Q', e.x, Qy, e.x, Qy + radius]);
                            /* path.push(['L', e.x + radius * 4, e.y - radius]);
                            // 距离目标最近的圆弧
                            path.push(['Q', e.x + radius * 4, e.y, e.x + radius * 3, e.y]); */
                        } else if (e.x === eBbox.centerX + eBbox.width / 2) {
                            // 指向最右边的锚点 需要加个折点
                            path.push(['L', e.x + radius * 5, Qy]);
                            path.push(['Q', e.x + radius * 4, Qy, e.x + radius * 4, Qy + radius]);
                            path.push(['L', e.x + radius * 4, e.y - radius]);
                            // 距离目标最近的圆弧
                            path.push(['Q', e.x + radius * 4, e.y, e.x + radius * 3, e.y]);
                        } else if (e.y === eBbox.centerY + eBbox.height / 2) {
                            // 指向最下面的锚点

                        } else if (e.x === eBbox.centerX - eBbox.width / 2) {
                            // 指向最左边的锚点
                            path.push(['L', e.x - radius * 3, Qy]);
                            path.push(['Q', e.x - radius * 4, Qy, e.x - radius * 4, Qy + radius]);
                            path.push(['L', e.x - radius * 4, e.y - radius]);
                            // 距离目标最近的圆弧
                            path.push(['Q', e.x - radius * 4, e.y, e.x - radius * 3, e.y]);
                        }
                    }

                } else if (e.y < s.y) {
                    // ↑ 向上
                }
            } else if (e.y !== s.y) {
                if (e.x > s.x) {
                    // -> 向右

                } else if (e.x < s.x) {
                    // <- 向左

                }
            }

            path.push(['L', e.x, e.y]); // 推入终点坐标
            return path;
        },
    });
};
