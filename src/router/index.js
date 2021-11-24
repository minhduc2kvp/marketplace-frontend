import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import ls from '@/commons/local-storage.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active',
});

// Meta handling
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    const user = JSON.parse(ls.getUser());
    if (user) {
      next();
    } else {
      next({ path: '/login', params: { nextUrl: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
