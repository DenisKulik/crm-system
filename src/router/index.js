import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('@/views/CategoriesView.vue'),
  },
  {
    path: '/detail-record/:id',
    name: 'detail-record',
    meta: { layout: 'main' },
    component: () => import('@/views/DetailRecordView.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main' },
    component: () => import('@/views/HistoryView.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main' },
    component: () => import('@/views/PlanningView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('@/views/RecordView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
