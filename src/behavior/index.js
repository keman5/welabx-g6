import clickSelected from './click-selected.js';
import ahchorActived from './anchor-actived.js';
import hoverNode from './hover-node.js';
// import dragNode from './dragNode.js';

export default G6 => {
    clickSelected(G6);
    ahchorActived(G6);
    hoverNode(G6);
    // dragNode(G6);
};
