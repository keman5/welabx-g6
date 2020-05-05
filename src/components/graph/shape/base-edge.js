/**
 * @author claude
 * @date 2018/3/15
 * @description 注册基础edge, 其他edge都在此基础上继承和扩展
 */

import itemEvents from './items/item-event';

/*
 * flow:
 * 注册基础edge => 绘制edge => 初始化edge状态 => dege动画(设置交互动画)
 */

export default G6 => {
  G6.registerEdge('polyline-edge', {

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
  }, 'polyline');

  G6.registerEdge('line-edge', {

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
  }, 'line');

  G6.registerEdge('quadratic-edge', {

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
  }, 'quadratic');

  G6.registerEdge('cubic-edge', {

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
  }, 'cubic');

  G6.registerEdge('arc-edge', {
    curveOffset: 40,
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
  }, 'arc');
};
