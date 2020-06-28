import registerBaseNode from './items/base-node';
import registerEdge from './edges/base-edge';
import registerNode from './node';

export default (G6, graph) => {
  // 先注册基础节点
  registerBaseNode(G6, graph);
  registerNode(G6, graph);
  registerEdge(G6, graph);
};
