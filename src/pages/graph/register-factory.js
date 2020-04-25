import behavior from '../../assets/js/behavior/exports';
import shape from '../../assets/js/shape/exports';

export default G6 => {
    // 注册行为
    behavior(G6);
    // 注册图形
    shape(G6);
};
