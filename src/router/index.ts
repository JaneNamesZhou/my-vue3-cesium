// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 引入页面组件（路径按你自己的文件结构调整）
import ServicePlatformDashboard from '@/views/ServicePlatformDashboard.vue'
import AboutPage from '@/views/AboutPage.vue'
import LandingPage from '@/views/LandingPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/service-platform-dashboard',
    name: 'ServicePlatformDashboard',
    component: ServicePlatformDashboard
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
