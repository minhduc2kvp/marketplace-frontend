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
];

export default routes;
