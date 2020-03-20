import registerBaseNode from './items/base-node';
import registerNode from './node';
import registerEdge from './edge';

export default G6 => {
    // 先注册基础节点
    registerBaseNode(G6);
    registerNode(G6);
    registerEdge(G6);
};
