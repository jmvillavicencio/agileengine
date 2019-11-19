import Vue from 'vue';
import VueRouter from 'vue-router';
import qs from 'qs';
import Home from '../pages/Home';
import NewTransaction from '../pages/NewTransaction';


Vue.use(VueRouter);

const routes = [
  {
    path: '/transaction/new',
    name: 'newTransaction',
    component: NewTransaction,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  stringifyQuery: (obj) => {
    const result = qs.stringify(obj);
    return result ? `?${result}` : '';
  },
  parseQuery: (str) => {
    return qs.parse(str);
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('userId') == null) {
      next({
        name: 'Home',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default () => router;
