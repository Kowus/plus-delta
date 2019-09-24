import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true,
        title: 'Plus, Delta: Dashboard',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./views/Auth.vue'),
      redirect: '/auth/register',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('./components/auth/Login.vue'),
          meta: {
            default: false,
            guest: true,
            title: 'Login',
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./components/auth/Signup.vue'),
          meta: {
            default: true,
            guest: true,
            title: 'Register',
          },
        },
      ],
    },
  ],
});
