/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import itemEvents from './items/item-event';

/*
 * flow:
 * 继承 edge => 绘制edge => 设置edge状态
 */

let running = true;

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
  // 获得当前边的第1个图形，这里是边本身的 path
  const path = group.get('children')[0];
  const startPoint = path.getPoint(0);
  // const { endArrow } = path.get('attrs');
  const length = path.getTotalLength();

  if (length <= 30) return; // 线段太短就不要动画了

  const num = Math.ceil(length / 100);

  running = true;

  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      if (running) {
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
            const opacity = (length - length * ratio) >= 8 ? 1: 0;

            // 返回需要变化的参数集，这里返回了位置 x 和 y
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
              opacity,
            };
          }, {
            duration: length >= 100 ? 1000: length * 6,
            repeat:   true,
          },
        );
      }
    }, i * 500);
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
  running = false;
}

export default G6 => {
  // 直线
  G6.registerEdge('line-edge', {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, 'line');

  // 折线
  G6.registerEdge('polyline-edge', {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, 'polyline');

  // 二次贝塞尔曲线
  G6.registerEdge('quadratic-edge', {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, 'quadratic');

  // 三次贝塞尔曲线
  G6.registerEdge('cubic-edge', {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, 'cubic');

  G6.registerEdge('arc-edge', {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, 'arc');
};
