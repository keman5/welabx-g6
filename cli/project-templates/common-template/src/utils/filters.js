/**
 * 全局过滤器
 */

import { dateFormat } from '@src/utils/date';

export default Vue => {
    Vue.filter('dateFormat', dateFormat);
};
