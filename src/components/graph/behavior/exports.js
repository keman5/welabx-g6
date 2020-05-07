/**
 * @author claude
 * @date 2018/3/15
 * @description 暴露所有注册方法
 */

import canvasEvent from './canvas-event';
import selectNode from './select-node';
import deleteItem from './delete-item';
import activeEdge from './active-edge';
import hoverNode from './hover-node';
import dragNode from './drag-node';

export default G6 => {
  canvasEvent(G6);
  selectNode(G6);
  deleteItem(G6);
  activeEdge(G6);
  hoverNode(G6);
  dragNode(G6);
};
