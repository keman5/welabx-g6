/*!
 * @author claude
 * date 07/05/2019
 * 全局路由入口
 */

import Vue from 'vue';
import Router from 'vue-router';
import baseRoutes from './routes';
import guards from './guards';

// 防止路由重复跳转报错
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

Vue.use(Router);

// 实例化路由
const createRouter = routes => new Router({
    routes,
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

const router = createRouter(baseRoutes);

// 添加动态路由
router.$addRoutes = (array) => {
    // 清空 matcher
    router.matcher = createRouter([]).matcher;
    // 重新添加路由以重建 matcher
    router.addRoutes(array);
};

// 路由守卫
guards(router);

export default router;
