import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import DyTable from './components/table/DyTable.vue';
import Http from './services/http/http.js';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './scss/_main.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('dy-table',DyTable); // 全局注册自定义带分页的table组件

/**
 * api 请求地址
 */
const stage = process.env.STAGE;

console.log('stage:', stage);
console.log(process.env.TEST_API);
const api = process.env[stage.toUpperCase() + '_API'];

console.log('api:', api);
window.api = api;

Vue.prototype.$http = new Http().http;

/**
 * 跳转至登录地址及我的标签地址
 */
const loginLink = 'LOGIN_' + stage.toUpperCase();

console.log(process.env[loginLink]);
const href = encodeURIComponent(`${location.origin}?sysCode=${process.env.APP_SYSCODE}`);

window.loginLink = process.env[loginLink] + `?to=${href}`;
window.tagLink = process.env[loginLink] + '/user';

window.$app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
