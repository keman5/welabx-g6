import registerBaseNode from './nodes/base-node';
import registerNode from './node';

export default (G6) => {
  // 先注册基础节点
  registerBaseNode(G6);
  registerNode(G6);
};
