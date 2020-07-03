/*!
 * @author claude
 * date 07/05/2019
 * 公共 route 配置文件
 */

/**
 * @param {meta: requiresAuth} Boolean false 无需登录权限即可进入
 * @param {meta: requiresLogout} Boolean true 必须未登录才能访问
 * @param {meta: permission} Boolean 表明当前用户是否有权限访问
 * @param {meta: icon} String 当前菜单的图标
 * @param {meta: title} String 当前菜单的标题
 * @param {meta: asmenu} Boolean 只显示1级菜单
 */
const { pathname } = window.location;
const prefixPath = process.env.NODE_ENV === 'development' ? '/' : `/${process.env.CONTEXT_ENV}/`;

// 主框架路由
const baseRoutes = [
    {
        path: prefixPath,
        meta: {
            title:          '控制面板',
            requiresLogout: false,
            asmenu:         true,
        },
        component: () => import('@comp/LayoutBase.vue'),
        children:  [
            {
                path: prefixPath,
                name: 'index',
                meta: {
                    title: '控制面板',
                    icon:  'el-icon-monitor',
                    index: 0,
                },
                component: () => import('@views/index/dashboard.vue'),
            },
        ],
    },
    {
        path: `${prefixPath}login`,
        name: 'login',
        meta: {
            title:          '登录',
            requiresAuth:   false,
            requiresLogout: true,
        },
        component: () => import('@views/sign/login.vue'),
    },
    {
        path: `${prefixPath}register`,
        name: 'register',
        meta: {
            title:          '注册',
            requiresAuth:   false,
            requiresLogout: true,
        },
        component: () => import('@views/sign/register.vue'),
    },
    {
        path: `${prefixPath}find-password`,
        name: 'find-password',
        meta: {
            title:          '找回密码',
            requiresAuth:   false,
            requiresLogout: true,
        },
        component: () => import('@views/sign/find-password.vue'),
    },
    {
        path: `${prefixPath}notfound`,
        name: 'notfound',
        meta: {
            requiresAuth: false,
        },
        component: () => import('@views/error/404.vue'),
    },
    {
        path: `${prefixPath}forbidden`,
        name: 'forbidden',
        meta: {
            requiresAuth: false,
        },
        component: () => import('@views/error/403.vue'),
    },
    {
        path:     '*',
        redirect: {
            path:  `${prefixPath}login`,
            query: {
                redirect: pathname,
            },
        },
    },
];

export default baseRoutes;
