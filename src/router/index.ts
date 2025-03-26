import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import('@/views/EventView.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: () => import('@/views/EventDetailView.vue'),
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import('@/views/PaymentView.vue'),
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("@/views/GalleryView.vue")
  },
  {
    path: "/email",
    name: "Email",
    component: () => import("@/views/emailPage.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
