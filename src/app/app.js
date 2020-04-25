/*!
 * @author claude
 * date 2019/11/09
 * 应用程序入口文件
 */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import '@styles/base.scss';

const router = new VueRouter({
    mode:   'history',
    routes: [
        {
            path:      '*',
            component: () => import('../pages/graph/graph.vue'),
        },
    ],
});

Vue.use(VueRouter);

// 添加 eventbus
Vue.prototype.$bus = new Vue();

/**
 * 应用入口
 */
window.$app = new Vue({
    el:     '#app',
    render: h => h(App),
    router,
});

// 阻止双击放大
let lastTouchEnd = 0;

document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();

    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 阻止双指放大
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});
