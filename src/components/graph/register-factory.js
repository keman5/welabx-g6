/**
 * @author claude
 * @date 2020/04/26
 * @description 注册工厂函数
 */

import behavior from './behavior/exports';
import shape from './shape/exports';

export default G6 => {
  // 注册行为
  behavior(G6);
  // 注册图形
  shape(G6);
};
