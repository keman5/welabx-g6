import Vue from 'vue';
import VueRouter from 'vue-router';
import { setTitle } from './setTitle';
import Home from '../views/home/Home.vue';
import Http from '../services/http/http.js';
import {
  handleCookies, query,
} from '../services/common.js';

Vue.use(VueRouter);

const http = new Http().http;

const getUserData = async (next) => {
    const res = await http.get('/base/menuAndRole', { apiPrefix: false });

    if (!res.data || !res.data.menulist || !res.data.menulist.length) {
        window.$app.$message.error('对不起，您的账户没有菜单权限');
        return;
    }
    const btnList = [];

    for(const item of res.data.buttonlist) {
        btnList.push(item.moduleCode);
    }
    const username = res.data.user.username,
        roleName = res.data.role.roleName;

    window.$app.$store.dispatch('updateStoreState', {
        username,
        roleName,
    });
    if(query.token) {
        handleCookies.setCookies({
            token:    query.token,
            sysCode:  query.sysCode
        });
    }
    handleCookies.setCookies({
        username,
        roleName,
        btnList,
        menuList: res.data.menulist,
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
 * @param {meta: permission} Boolean    访问路由的权限
 * @param {meta: title} String     当前页面title
 */
const routes = [
    {
        path:      '/',
        component: Home,
        children:  [
            {
                path: '/',
                name: 'rule',
                component: () => import('../views/home/rule/Rule.vue'),
                meta: {
                    menuCode: 'rule',
                    menuName: '规则字段',
                    title: '基础信息管理-规则字段',
                    station: '基础信息管理-规则字段',
                    permission: false,
                },
            },
        ],
        meta: {
            menuCode:   'baseInfo',
            menuName:   '基础信息管理',
            permission: true,
            title:      '基础信息管理',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    getUserData(next);
});

router.afterEach(route => {
    setTitle(route.meta.title);
});

export default router;
