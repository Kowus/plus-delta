import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import Auth from './plugins/auth';

Vue.use(Auth);
const httpClient = axios.create({ baseURL: process.env.VUE_APP_API });
httpClient.interceptors.request.use(
  (config) => {
    const token = Vue.auth.getToken();
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.common.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error.request),
);
httpClient.interceptors.response.use(
  response => response,
  (error) => {
    // Vue.prototype.$message({
    //   showClose: true,
    //   message: error.response.data.message,
    //   type: 'error',
    // });
    return Promise.reject(error.response);
  },
);
Vue.config.productionTip = false;
Vue.prototype.$http = httpClient;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Plus, Delta';
  if (to.matched.some(record => record.meta.guest) && Vue.auth.loggedIn()) {
    return next({ path: '/' });
  }
  if (to.matched.some(record => record.meta.auth) && !Vue.auth.loggedIn()) {
    return next({
      path: '/auth',
      query: { redirect: to.fullPath },
    });
  }
  return next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
