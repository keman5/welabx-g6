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

export default G6 => {
  // 直线
  G6.registerEdge('line-edge', {
    setState,
  }, 'line');

  // 折线
  G6.registerEdge('polyline-edge', {
    setState,
  }, 'polyline');

  // 二次贝塞尔曲线
  G6.registerEdge('quadratic-edge', {
    setState,
  }, 'quadratic');

  // 三次贝塞尔曲线
  G6.registerEdge('cubic-edge', {
    setState,
  }, 'cubic');

  G6.registerEdge('arc-edge', {
    setState,
  }, 'arc');
};
