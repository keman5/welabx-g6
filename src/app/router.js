const routes = [
    {
        path:      '*',
        component: () => import('../graph/graph.vue'),
    },
    {
        path:      '/tree',
        component: () => import('../treegraph/Treegraph.vue'),
    },
];

export default routes;
