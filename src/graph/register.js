import behavior from '../behavior/index.js';
import archor from '../shape/exports';

export default G6 => {
    // 注册行为
    behavior(G6);
    // 注册锚点
    archor(G6);
};
