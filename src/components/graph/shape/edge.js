/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import itemEvents from './items/item-event';
import defaultStyles from './defaultStyles';

const { edgeStyles } = defaultStyles;
const PI = Math.PI,
  sin = Math.sin,
  cos = Math.cos;

const uniqBy = (arr, key) => {
  const result = [];

  arr.forEach(i => {
    if (!result.find(r => r[key] === i[key])) {
      result.push(i);
    }
  });
  return result;
};

let __assign = (...args) => {
  __assign = Object.assign || function __assign (t) {
    for (let s, i = 1, n = args.length; i < n; i++) {
      s = args[i];
      for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, args);
};

const revertAlign = labelPosition => {
  let textAlign = labelPosition;

  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if (labelPosition === 'end') {
    textAlign = 'start';
  }

  return textAlign;
};

/*
 * flow:
 * 注册基础edge => 绘制edge => 初始化edge状态 => dege动画(设置交互动画)
 */

export default G6 => {
  G6.registerEdge('base-edge', {
    options: {
      labelCfg: {

      },
    },
    /**
     * 文本的位置
     * @type {String}
     */
    labelPosition: 'center',

    /**
     * 文本的 x 偏移
     * @type {Number}
     */
    refX: 0,

    /**
     * 文本的 y 偏移
     * @type {Number}
     */
    refY: 0,

    /**
     * 文本是否跟着线自动旋转，默认 false
     * @type {Boolean}
     */
    labelAutoRotate: false,
    /* 绘制文本 */
    drawLabel (cfg, group) {
      const { labelCfg } = this.options;
      const labelStyle = this._getLabelStyleByPosition(cfg, labelCfg || {}, group);

      const text = cfg.label || '';
      const label = group.addShape('text', {
        attrs: {
          fill: '#666',
          ...labelStyle,
          ...labelCfg,
          text,
        },
        className: 'edge-label-text',
      });

      if (text) {
        const labelBBox = label.getBBox();

        group.addShape('rect', {
          attrs: {
            ...labelStyle,
            x:       labelBBox.x - 3,
            y:       labelBBox.y - 3,
            width:   labelBBox.width + 6,
            height:  labelBBox.height + 6,
            fill:    '#fff',
            opacity: 0.7,
            ...labelCfg,
          },
          className: 'edge-label',
        });
      }

      label.toFront();
    },
    /* 绘制节点，包含文本 */
    drawShape (cfg, group) {
      const attrs = this.getShapeStyle(cfg);
      const keyShape = group.addShape('path', {
        attrs,
        className: 'base-edge',
      });

      // 绘制文本
      this.drawLabel(cfg, group);

      return keyShape;
    },
    /* afterUpdate (cfg, edge) {
        const text = edge.get('group').get('children').find(o => o.get('className') === 'edge-label-text');

        setTimeout(() => {
            text.attr('text', 'edge');
        });
    }, */
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
    },
    getShapeStyle (cfg) {
      const { startPoint, endPoint } = cfg;
      const stroke = (cfg.style && cfg.style.stroke) || edgeStyles.stroke;
      const lineAppendWidth = (cfg.style && cfg.style.lineAppendWidth) || edgeStyles.lineAppendWidth;
      // const startArrow = (cfg.style && cfg.style.startArrow) || edgeStyles.startArrow;
      const endArrow = (cfg.style && cfg.style.endArrow) || edgeStyles.endArrow;
      const controlPoints = this._getControlPoints(cfg);

      let points = [startPoint];

      if (controlPoints) {
        points = points.concat(controlPoints);
      }
      points.push(endPoint);

      const path = this._getPath(points);

      return {
        path,
        stroke,
        lineAppendWidth,
        endArrow,
      };
    },
    _getTextAlign (labelPosition, angle) {
      let textAlign = 'center';

      if (!angle) {
        return labelPosition;
      }

      angle = angle % (Math.PI * 2); // 取模

      if (labelPosition !== 'center') {
        if (angle >= 0 && angle <= Math.PI / 2 || angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI) {
          textAlign = labelPosition;
        } else {
          textAlign = revertAlign(labelPosition);
        }
      }

      return textAlign;
    },
    _getLabelPosition (pathShape, percent, refX, refY, rotate) {
      const TAN_OFFSET = 0.0001;
      const point = pathShape.getPoint(percent);

      if (point === null) {
        return {
          x:     0,
          y:     0,
          angle: 0,
        };
      } // 头尾最可能，放在最前面，使用 g path 上封装的方法

      let vector = [];

      if (percent < TAN_OFFSET) {
        vector = pathShape.getStartTangent().reverse();
      } else if (percent > 1 - TAN_OFFSET) {
        vector = pathShape.getEndTangent();
      } else {
        // 否则取指定位置的点,与少量偏移的点，做微分向量
        const offsetPoint = pathShape.getPoint(percent + TAN_OFFSET);

        vector.push([point.x, point.y]);
        vector.push([offsetPoint.x, offsetPoint.y]);
      }

      let rad = Math.atan2(vector[1][1] - vector[0][1], vector[1][0] - vector[0][0]);

      if (rad < 0) {
        rad += PI * 2;
      }

      if (refX) {
        point.x += cos(rad) * refX;
        point.y += sin(rad) * refX;
      }

      if (refY) {
        // 默认方向是 x 轴正方向，法线是 求出角度 - 90°
        let normal = rad - PI / 2; // 若法线角度在 y 轴负方向，切到正方向，保证 refY 相对于 y 轴正方向

        if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
          normal -= PI;
        }

        point.x += cos(normal) * refY;
        point.y += sin(normal) * refY;
      }

      const result = {
        x:     point.x,
        y:     point.y,
        angle: rad,
      };

      if (rotate) {
        if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
          rad -= PI;
        }

        return __assign({
          rotate: rad,
        }, result);
      }

      return result;
    },
    _getLabelStyleByPosition (cfg, labelCfg, group) {
      const labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入
      const style = {};
      const pathShape = group && group.find(function (element) {
        return element.get('className') === 'base-edge';
      }); // 不对 pathShape 进行判空，如果线不存在，说明有问题了

      let pointPercent;

      if (labelPosition === 'start') {
        pointPercent = 0;
      } else if (labelPosition === 'end') {
        pointPercent = 1;
      } else {
        pointPercent = 0.5;
      } // 偏移量

      const offsetX = labelCfg.refX || this.refX;
      const offsetY = labelCfg.refY || this.refY; // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移

      if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
        style.x = cfg.startPoint.x + offsetX;
        style.y = cfg.startPoint.y + offsetY;
        style.text = cfg.label;
        return style;
      }

      const autoRotate = labelCfg.autoRotate == null ? this.labelAutoRotate : labelCfg.autoRotate;

      const offsetStyle = this._getLabelPosition(pathShape, pointPercent, offsetX, offsetY, autoRotate);

      style.x = offsetStyle.x;
      style.y = offsetStyle.y;
      style.rotate = offsetStyle.rotate || false;
      style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
      style.text = cfg.label;
      return style;
    },
    _getPath (points) {
      const path = [];

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (i === 0) {
          path.push(['M', point.x, point.y]);
        } else if (i === points.length - 1) {
          path.push(['L', point.x, point.y]);
        } else {
          const prevPoint = points[i - 1];

          const nextPoint = points[i + 1];

          let cornerLen = 5;

          if (Math.abs(point.y - prevPoint.y) > cornerLen || Math.abs(point.x - prevPoint.x) > cornerLen) {
            if (prevPoint.x === point.x) {
              path.push(['L', point.x, point.y > prevPoint.y ? point.y - cornerLen : point.y + cornerLen]);
            } else if (prevPoint.y === point.y) {
              path.push(['L', point.x > prevPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y]);
            }
          }
          const yLen = Math.abs(point.y - nextPoint.y);
          const xLen = Math.abs(point.x - nextPoint.x);

          if (yLen > 0 && yLen < cornerLen) {
            cornerLen = yLen;
          } else if (xLen > 0 && xLen < cornerLen) {
            cornerLen = xLen;
          }
          if (prevPoint.x !== nextPoint.x && nextPoint.x === point.x) {
            path.push(['Q', point.x, point.y, point.x, point.y > nextPoint.y ? point.y - cornerLen : point.y + cornerLen]);
          } else if (prevPoint.y !== nextPoint.y && nextPoint.y === point.y) {
            path.push(['Q', point.x, point.y, point.x > nextPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y]);
          }
        }
      }
      return path;
    },
    _getControlPoints (cfg) {
      if (!cfg.sourceNode) {
        return cfg.controlPoints;
      }
      return this._polylineFinding(cfg.sourceNode, cfg.targetNode, cfg.startPoint, cfg.endPoint, 15);
    },
    _getExpandedBBox (bbox, offset) {
      return 0 === bbox.width && 0 === bbox.height ? bbox : {
        centerX: bbox.centerX,
        centerY: bbox.centerY,
        minX:    bbox.minX - offset,
        minY:    bbox.minY - offset,
        maxX:    bbox.maxX + offset,
        maxY:    bbox.maxY + offset,
        height:  bbox.height + 2 * offset,
        width:   bbox.width + 2 * offset,
      };
    },
    _getExpandedPort (bbox, point) {
      return Math.abs(point.x - bbox.centerX) / bbox.width > Math.abs(point.y - bbox.centerY) / bbox.height
        ? { x: point.x > bbox.centerX ? bbox.maxX : bbox.minX, y: point.y }
        : { x: point.x, y: point.y > bbox.centerY ? bbox.maxY : bbox.minY };
    },
    _combineBBoxes (sBBox, tBBox) {
      const minX = Math.min(sBBox.minX, tBBox.minX), minY = Math.min(sBBox.minY, tBBox.minY);
      const maxX = Math.max(sBBox.maxX, tBBox.maxX), maxY = Math.max(sBBox.maxY, tBBox.maxY);

      return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        minX,
        minY,
        maxX,
        maxY,
        height:  maxY - minY,
        width:   maxX - minX,
      };
    },
    _getBBoxFromVertexes (sPoint, tPoint) {
      const minX = Math.min(sPoint.x, tPoint.x);
      const maxX = Math.max(sPoint.x, tPoint.x);
      const minY = Math.min(sPoint.y, tPoint.y);
      const maxY = Math.max(sPoint.y, tPoint.y);

      return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        maxX,
        maxY,
        minX,
        minY,
        height:  maxY - minY,
        width:   maxX - minX,
      };
    },
    _vertexOfBBox (bbox) {
      return [
        { x: bbox.minX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.minY },
        { x: bbox.maxX, y: bbox.maxY },
        { x: bbox.minX, y: bbox.maxY },
      ];
    },
    _crossPointsByLineAndBBox (bbox, centerPoint) {
      let crossPoints = [];

      if (!(centerPoint.x < bbox.minX || centerPoint.x > bbox.maxX))
        crossPoints = crossPoints.concat([
          { x: centerPoint.x, y: bbox.minY },
          { x: centerPoint.x, y: bbox.maxY },
        ]);
      if (!(centerPoint.y < bbox.minY || centerPoint.y > bbox.maxY))
        crossPoints = crossPoints.concat([
          { x: bbox.minX, y: centerPoint.y },
          { x: bbox.maxX, y: centerPoint.y },
        ]);
      return crossPoints;
    },
    _getConnectablePoints (sBBox, tBBox, sPoint, tPoint) {
      const lineBBox = this._getBBoxFromVertexes(sPoint, tPoint);
      const outerBBox = this._combineBBoxes(sBBox, tBBox);
      const sLineBBox = this._combineBBoxes(sBBox, lineBBox);
      const tLineBBox = this._combineBBoxes(tBBox, lineBBox);

      let points = [];

      points = points.concat(this._vertexOfBBox(sLineBBox), this._vertexOfBBox(tLineBBox), this._vertexOfBBox(outerBBox));

      const centerPoint = { x: outerBBox.centerX, y: outerBBox.centerY };

      [outerBBox, sLineBBox, tLineBBox, lineBBox].forEach(bbox => {
        points = points.concat(this._crossPointsByLineAndBBox(bbox, centerPoint));
      });
      points.push({ x: sPoint.x, y: tPoint.y });
      points.push({ x: tPoint.x, y: sPoint.y });
      return points;
    },
    _filterConnectablePoints (points, bbox) {
      return points.filter(point => point.x <= bbox.minX || point.x >= bbox.maxX || point.y <= bbox.minY || point.y >= bbox.maxY);
    },
    _AStar (points, sPoint, tPoint, sBBox, tBBox) {
      const openList = [sPoint];
      const closeList = [];

      points = uniqBy(this._fillId(points), 'id');
      points.push(tPoint);
      let endPoint;

      while (openList.length > 0) {
        let minCostPoint;

        openList.forEach((p, i) => {
          if (!p.parent) {
            p.f = 0;
          }
          if (!minCostPoint) {
            minCostPoint = p;
          }
          if (p.f < minCostPoint.f) {
            minCostPoint = p;
          }
        });

        if (minCostPoint.x === tPoint.x && minCostPoint.y === tPoint.y) {
          endPoint = minCostPoint;
          break;
        }
        openList.splice(openList.findIndex(o => o.x === minCostPoint.x && o.y === minCostPoint.y), 1);
        closeList.push(minCostPoint);

        const neighbor = points.filter(p => (p.x === minCostPoint.x || p.y === minCostPoint.y)
          && !(p.x === minCostPoint.x && p.y === minCostPoint.y)
          && !this._crossBBox([sBBox, tBBox], minCostPoint, p));

        neighbor.forEach(p => {
          const inOpen = openList.find(o => o.x === p.x && o.y === p.y);
          const currentG = this._getCost(p, minCostPoint);

          if (closeList.find(o => o.x === p.x && o.y === p.y)) {
            // ?
          } else if (inOpen) {
            if (p.g > currentG) {
              p.parent = minCostPoint;
              p.g = currentG;
              p.f = p.g + p.h;
            }
          } else {
            p.parent = minCostPoint;
            p.g = currentG;
            let h = this._getCost(p, tPoint);

            if (this._crossBBox([tBBox], p, tPoint)) {
              h += (tBBox.width / 2 + tBBox.height / 2); //如果穿过bbox则增加该点的预估代价为bbox周长的一半
            }
            p.h = h;
            p.f = p.g + p.h;
            openList.push(p);
          }
        });
      }
      if (endPoint) {
        const result = [];

        result.push({ x: endPoint.x, y: endPoint.y });
        while (endPoint.parent) {
          endPoint = endPoint.parent;
          result.push({ x: endPoint.x, y: endPoint.y });
        }
        return result.reverse();
      }
      return [];
    },
    _crossBBox (bboxes, p1, p2) {
      for (let i = 0; i < bboxes.length; i++) {
        const bbox = bboxes[i];

        if (p1.x === p2.x && bbox.minX < p1.x && bbox.maxX > p1.x) {
          if (p1.y < bbox.maxY && p2.y >= bbox.maxY || p2.y < bbox.maxY && p1.y >= bbox.maxY) {
            return true;
          }
        } else if (p1.y === p2.y && bbox.minY < p1.y && bbox.maxY > p1.y) {
          if (p1.x < bbox.maxX && p2.x >= bbox.maxX || p2.x < bbox.maxX && p1.x >= bbox.maxX) {
            return true;
          }
        }
      }
      return false;
    },
    _getCost (p1, p2) {
      return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    },
    _getPointBBox (t) {
      return {
        centerX: t.x,
        centerY: t.y,
        minX:    t.x,
        minY:    t.y,
        maxX:    t.x,
        maxY:    t.y,
        height:  0,
        width:   0,
      };
    },
    _fillId (points) {
      points.forEach(p => {
        p.id = p.x + '-' + p.y;
      });
      return points;
    },
    _polylineFinding (sNode, tNode, sPort, tPort, offset) {
      const sourceBBox = sNode && sNode.getBBox() ? sNode.getBBox() : this._getPointBBox(sPort);
      const targetBBox = tNode && tNode.getBBox() ? tNode.getBBox() : this._getPointBBox(tPort);
      const sBBox = this._getExpandedBBox(sourceBBox, offset);
      const tBBox = this._getExpandedBBox(targetBBox, offset);
      const sPoint = this._getExpandedPort(sBBox, sPort);
      const tPoint = this._getExpandedPort(tBBox, tPort);

      let points = this._getConnectablePoints(sBBox, tBBox, sPoint, tPoint);

      points = this._filterConnectablePoints(points, sBBox);
      points = this._filterConnectablePoints(points, tBBox);

      const polylinePoints = this._AStar(points, sPoint, tPoint, sBBox, tBBox);

      return polylinePoints;
    },
  });
};
