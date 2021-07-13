/**
 * @author claude
 * @date 2020/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import animation from './edge-animations';
import itemEvents from '../items/item-event';
import hvh_h from './hvh-h.js';
import hvh from './hvh.js';

/*
 * flow:
 * 继承 edge => 绘制edge => 设置edge状态
 */

function drawShape (cfg, group) {
  group.running = false;
  group.runners = [];
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

  if (group.get('destroyed')) return;
  if (buildInEvents.includes(name)) {
    // 内部this绑定到了当前item实例
    itemEvents[name].call(this, value, group);
  } else if (this.stateApplying) {
    this.stateApplying.call(this, name, value, item);
  } else {
    console.warn(`warning: edge ${name} 事件回调未注册!`);
  }
}

function runAnimate (group, animationType) {
  if (group.running) return;
  group.running = true;
  group.toFront();
  animation[animationType].run.call(this, group);
}

// 停止动画并删除动画元素
function stopAnimate (group, animationType) {
  animation[animationType].stop.call(this, group);
}

// 继承方法
function inheritEdge (G6, name) {
  G6.registerEdge(`${name}-edge`, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, name);
}

export default (G6) => {
  const edgeArray = ['line', 'polyline', 'quadratic', 'cubic', 'arc'];

  edgeArray.forEach(edge => {
    inheritEdge(G6, edge);
  });

  hvh(G6, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
  hvh_h(G6, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
};
