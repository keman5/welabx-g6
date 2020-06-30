/**
 * @author claude
 * @date 2020/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import itemEvents from '../items/item-event';
import hvh from './hvh.js';
import hvh_h from './hvh-h.js';

/*
 * flow:
 * 继承 edge => 绘制edge => 设置edge状态
 */

function drawShape (cfg, group) {
  // 当前配置覆盖全局配置
  const shapeStyle = Object.assign({}, this.getShapeStyle(cfg), {
    ...cfg.edgeStateStyles,
  });

  const keyShape = group.addShape('path', {
    className: 'edge-shape',
    name:      'edge-shape',
    attrs:     shapeStyle,
  });

  return keyShape;
}

function setState (name, value, item) {
  const buildInEvents = [
    'edgeState',
    'edgeState:default',
    'edgeState:selected',
    'edgeState:hover',
  ];
  const group = item.getContainer();

  if (buildInEvents.includes(name)) {
    // 内部this绑定到了当前item实例
    itemEvents[name].call(this, value, group);
  } else {
    console.warn(`warning: edge ${name} 事件回调未注册!`);
  }
}

function runAnimate (group) {
  if (this.running) return;
  this.running = true;
  // 获得当前边的第1个图形，这里是边本身的 path
  const path = group.get('children')[0];
  const endArrowShape = path.get('endArrowShape');
  // const endArrowPath = endArrowShape.attrs.path;
  const arrowSize = endArrowShape ? Math.max(endArrowShape.get('bbox').width, endArrowShape.get('bbox').height) : 0;
  const startPoint = path.getPoint(0);
  const length = path.getTotalLength();
  const num = Math.floor(length / 100) || 1;

  if (length <= 40) return; // 线段太短就不要动画了

  for (let i = 0; i < num; i++) {
    const timeout = setTimeout(() => {
      const circle = group.addShape('circle', {
        attrs: {
          x:    startPoint.x,
          y:    startPoint.y,
          fill: '#1890ff',
          r:    2,
        },
        className: 'edge-runner',
        name:      'edge-runner',
      });

      circle.animate(
        ratio => {
          const tmpPoint = path.getPoint(ratio);
          const opacity = length - length * ratio >= arrowSize ? 1 : 0;

          // ! 必须设置这个属性为false, 否则当起始位置落在画布外时将无法播放动画
          circle.set('hasChanged', false);

          // 返回需要变化的参数集，这里返回了位置 x 和 y
          return {
            ...tmpPoint,
            opacity,
          };
        },
        {
          duration: length >= 100 ? length * 3 : length * 5,
          repeat:   true,
        },
      );
    }, i * length);

    this.runners.push(timeout);
  }
}

// 停止动画并删除动画元素
function stopAnimate (group) {
  const runners = [];

  group.get('children').forEach(child => {
    if (child.get('className') === 'edge-runner') {
      child.stopAnimate();
      runners.push(child);
    }
  });

  runners.forEach(runner => runner.remove());
  // 清除所有定时器
  this.runners.forEach(settimeout => {
    clearTimeout(settimeout);
  });
  this.running = false;
}

// 继承方法
function inheritEdge (G6, name) {
  G6.registerEdge(`${name}-edge`, {
    running: false,
    runners: [],
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, name);
}

export default G6 => {
  const edgeArray = ['line', 'polyline', 'quadratic', 'cubic', 'arc'];

  edgeArray.forEach(edge => {
    inheritEdge(G6, edge);
  });

  hvh(G6, {
    running: false,
    runners: [],
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
  hvh_h(G6, {
    running: false,
    runners: [],
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
};
