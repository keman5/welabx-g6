/**
 * @param {string} shapeType 支持 rect/circel/path 等内置节点
 * @param {string} getShapeStyle 用于覆盖 base-node 默认样式
 * @param {string} icon 图片 url
 * @param {string} labelCfg 文本节点样式
 */
import defaultStyles from './defaultStyles';

const {
  iconStyles,
  nodeStyles,
  anchorPointStyles,
  nodeLabelStyles,
} = defaultStyles;

export default G6 => {
  // 从 base-node 中扩展方形节点
  G6.registerNode('rect-node', {
    shapeType: 'rect',
    // 当前节点默认样式
    options:   {
      // icon: require('../../../assets/images/TB1_1680x370.png').default,
      iconStyles,
    },
    // 覆盖 base-node 默认样式
    getShapeStyle (cfg) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;

      return {
        ...nodeStyles,
        width,
        height,
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x:        -width / 2,
        y:        -height / 2,
        anchorPointStyles,
        labelCfg: {
          ...nodeLabelStyles,
          // ...cfg.nodeLabelStyles,
        },
        radius: 5,
        ...cfg.style,
        ...cfg.nodeStateStyles,
      };
    },
  }, 'base-node');

  // 扩展圆形节点
  G6.registerNode('circle-node', {
    shapeType: 'circle',
    getShapeStyle (cfg) {
      const r = cfg.style.r || 30;

      return {
        ...nodeStyles,
        r, // 半径
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x:        0,
        y:        0,
        anchorPointStyles,
        labelCfg: {
          ...nodeLabelStyles,
          // ...cfg.style.nodeLabelStyles,
        },
        ...cfg.style,
        ...cfg.nodeStateStyles,
      };
    },
  }, 'base-node');

  // 扩展椭圆形
  G6.registerNode('ellipse-node', {
    shapeType: 'ellipse',
    getShapeStyle (cfg) {

      return {
        rx:       50,
        ry:       30,
        ...nodeStyles,
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x:        0,
        y:        0,
        anchorPointStyles,
        labelCfg: {
          ...nodeLabelStyles,
          // ...cfg.style.nodeLabelStyles,
        },
        ...cfg.style,
        ...cfg.nodeStateStyles,
      };
    },
  }, 'base-node');

  // 扩展菱形
  G6.registerNode('diamond-node', {
    shapeType: 'path', // 非内置 shape 要指定为path
    getShapeStyle (cfg) {
      const path = this.getPath(cfg);

      return {
        path,
        ...nodeStyles,
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x:        0,
        y:        0,
        anchorPointStyles,
        labelCfg: {
          ...nodeLabelStyles,
          // ...cfg.style.nodeLabelStyles,
        },
        ...cfg.style,
        ...cfg.nodeStateStyles,
      };
    },
    // 返回菱形的路径
    getPath (cfg) {
      const size = cfg.size || [80, 80]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];

      //  / 1 \
      // 4     2
      //  \ 3 /
      return [
        ['M', 0, -height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧顶点
        ['L', 0, height / 2], // 下部顶点
        ['L', -width / 2, 0], // 左侧顶点
        ['Z'], // 封闭
      ];
    },
  }, 'base-node');

  // 扩展三角形节点
  /* G6.registerNode('triangle-node', {
    shapeType: 'triangle',
    getShapeStyle (cfg) {

      return {
        direction: 'top',
        size:      [130, 130, 130],
        ...nodeStyles,
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x:         0,
        y:         0,
        anchorPointStyles,
        labelCfg:  {
            ...nodeLabelStyles,
            // ...cfg.style.nodeLabelStyles,
        },
        anchorPoints: this.getAnchorPoints(cfg),
      };
    },
  }, 'base-node'); */
};
