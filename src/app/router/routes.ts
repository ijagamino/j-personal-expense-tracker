import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
      {
        path: 'change-password',
        component: () => import('src/pages/ChangePasswordPage.vue'),
        name: 'changePassword',
      },
    ],
    meta: { requiresAuth: true },
  },

  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('src/pages/LoginPage.vue'),
        name: 'login',
      },
      {
        path: 'forgot-password',
        component: () => import('src/pages/ForgotPasswordPage.vue'),
        name: 'forgotPassword',
      },
    ],
    meta: { guestOnly: true },
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
