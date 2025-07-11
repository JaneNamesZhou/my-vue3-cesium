// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 引入页面组件（路径按你自己的文件结构调整）
import LandingPage from '@/views/LandingPage.vue' 
import ServicePlatformDashboard from '@/views/ServicePlatformDashboard.vue'
import AboutPage from '@/views/AboutPage.vue'
import LoginPage from '@/views/LoginPage.vue'


const prefix = process.env.NODE_ENV === 'production' ? '/my-vue3-cesium' : ''

const routes: Array<RouteRecordRaw> = [
  {
    path: `${prefix}/login`,
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: `${prefix}/service-platform-dashboard`,
    name: 'ServicePlatformDashboard',
    component: ServicePlatformDashboard
  },
  {
    path: `${prefix}/about`,
    name: 'About',
    component: AboutPage
  },
  {
    path: `${prefix}/`,
    name: 'Landing',
    component: LandingPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
