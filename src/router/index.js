import Vue from 'vue';
import VueRouter from 'vue-router';
import qs from 'qs';
import Home from '../pages/Home';
import NewTransaction from '../pages/NewTransaction';


Vue.use(VueRouter);

const routes = [
  {
    path: '/transaction/new',
    name: 'NewTransaction',
    component: NewTransaction,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresUnAuth: true,
    },
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

function isSessionInStore() {
  return localStorage.getItem('userId') != null;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isSessionInStore()) {
    next({
      name: 'Home',
    });
  } else if (to.matched.some((record) => record.meta.requiresUnAuth) && isSessionInStore()) {
    next({
      name: 'NewTransaction',
    });
  } else {
    next();
  }
});

export default () => router;
