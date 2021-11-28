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
    children: [
      {
        path: '',
        redirect: 'account',
      },
      {
        path: 'account',
        component: require('@/views/Profile/Account.vue').default,
      },
      {
        path: 'history',
        component: require('@/views/Profile/History.vue').default,
      },
    ],
    meta: {
      auth: true,
      role: role.User,
    },
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: () => import('@/views/Admin'),
    children: [
      {
        path: '',
        redirect: 'tank',
      },
      {
        path: 'tank',
        component: require('@/views/Admin/TankForm.vue').default,
      },
      {
        path: 'bullet',
        component: require('@/views/Admin/BulletForm.vue').default,
      },
      {
        path: 'explosion',
        component: require('@/views/Admin/ExplosionForm.vue').default,
      },
    ],
    meta: {
      auth: true,
      role: role.Admin,
    },
  },
];

export default routes;
