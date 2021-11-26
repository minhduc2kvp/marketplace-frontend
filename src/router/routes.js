const role = {
  User: 0,
  Admin: 1,
};

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard'),
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import('@/views/Marketplace'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage'),
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/Error/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/Error/500.vue'),
  },
  {
    path: '/profile',
    name: 'ProfileUserPage',
    component: () => import('@/views/Profile'),
    meta: {
      auth: role.User,
    },
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('@/views/Admin'),
    meta: {
      auth: role.Admin,
    },
  },
];

export default routes;
