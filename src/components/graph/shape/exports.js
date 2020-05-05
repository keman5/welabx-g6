import registerBaseNode from './items/base-node';
import registerEdge from './base-edge';
import registerNode from './node';

export default G6 => {
  // 先注册基础节点
  registerBaseNode(G6);
  registerNode(G6);
  registerEdge(G6);
};
