// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 引入页面组件（路径按你自己的文件结构调整）
import LandingPage from '@/views/LandingPage.vue'
import ServicePlatformDashboard from '@/views/ServicePlatformDashboard.vue'
import LoginPage from '@/views/LoginPage.vue'
import DocsLayout from '@/views/DocsLayout.vue'
import GeocodingPage from '@/views/GeocodingPage.vue'

const prefix = process.env.NODE_ENV === 'production' ? '/my-vue3-cesium' : ''

const routes: Array<RouteRecordRaw> = [
  {
    path: `${prefix}/geocoding`,
    name: 'GeocodingPage',
    component: GeocodingPage

  },
  {
    path: `${prefix}/docs/:page?`,  // 加上可选参数 page
    name: 'DocsLayout',
    component: DocsLayout,
    props: true,                    // 允许将路由参数作为 props 传给组件
  },
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
