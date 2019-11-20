/*
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
      path:      '/',
      component: () => import('../pages/day-01/index.vue'),
    },
  ],
});

Vue.use(VueRouter);

/**
 * 应用入口
 */
window.$app = new Vue({
  el:     '#app',
  render: h => h(App),
  router,
});
