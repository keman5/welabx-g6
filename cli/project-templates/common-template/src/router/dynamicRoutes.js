/*!
 * @author claude
 * date 07/05/2019
 * 动态路由模块
 */

const prefixPath = process.env.NODE_ENV === 'development' ? '/' : `/${process.env.CONTEXT_ENV}/`;
const dynamicRoutes = [
    {
        path: prefixPath,
        meta: {
            permission: true,
            asmenu:     true,
            role:       '*',
        },
        children: [
            {
                path: '',
                name: 'index',
                meta: {
                    title: '控制面板',
                    icon:  'el-icon-monitor',
                },
                component: () => import('@views/index/dashboard.vue'),
            },
        ],
    },
];

export default dynamicRoutes;
