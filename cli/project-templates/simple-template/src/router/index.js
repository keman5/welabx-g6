import Vue from 'vue';
import VueRouter from 'vue-router';
import { setTitle } from './setTitle';
import Http from '../utils/http/http.js';
import {
    handleCookies, query,
} from '../utils/common.js';

Vue.use(VueRouter);

const http = new Http().http;

const getUserData = async (next) => {
    const res = await http.get('/base/menuAndRole', { apiPrefix: false });

    if (!res.data || !res.data.menulist || !res.data.menulist.length) {
        window.$app.$message.error('对不起，您的账户没有菜单权限');
        return;
    }
    const btnList = [];

    for (const item of res.data.buttonlist) {
        btnList.push(item.moduleCode);
    }
    const username = res.data.user.username,
        roleName = res.data.role.roleName;

    window.$app.$store.dispatch('updateStoreState', {
        username,
        roleName,
    });
    let curSysCode = window.sysCode;
    if (query.token) {
        handleCookies.setCookies({
            [`${curSysCode}-token`]: query.token,
            [`${curSysCode}-sysCode`]: query.sysCode
        });
    }
    handleCookies.setCookies({
        [`${curSysCode}-username`]: username,
        [`${curSysCode}-roleName`]: roleName,
        [`${curSysCode}-btnList`]: btnList,
        [`${curSysCode}-menuList`]: res.data.menulist
    });
    const loopFuc = (list) => {
        for (const item of list) {
            const permission = res.data.menulist.find((lst, index, obj) => {
                return lst.moduleCode === item.meta.menuCode;
            });

            if (permission) {
                item.meta.permission = true;
            }
            if (item.children) loopFuc(item.children);
        }
    };

    loopFuc(routes);
    next();
};

/**
 * 路由配置
 * @param {meta: menuCode} String    路由（菜单）唯一的code
 * @param {meta: menuName} String    路由（菜单）名称
 * @param {meta: title} String     当前页面title
 * @param {meta: permission} Boolean    访问路由的权限
 * @param {meta: asOneMenu} Boolean     隐藏二级路由
 */
const routes = [
    {
        path: '/',
        meta: {
            menuCode: 'dashboard',
            activeMenuCode: 'dashboard',
            menuName: '主面板',
            title: '主面板',
            permission: true,
            asOneMenu: true,
        },
        component: () => import('../views/home/Home.vue'),
        children: [
            {
                path: '/',
                name: 'dashboard',
                meta: {
                    menuCode: 'dashboard',
                    activeMenuCode: 'dashboard',
                    menuName: '主面板',
                    title: '主面板',
                    station: '主面板',
                    permission: false,
                },
                component: () => import('../views/home/dashboard/dashboard.vue'),
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if(window.isGetMenu) {
        next();
        return;
    }
    getUserData(next);
});

router.afterEach(route => {
    setTitle(route.meta.title);
});

export default router;
