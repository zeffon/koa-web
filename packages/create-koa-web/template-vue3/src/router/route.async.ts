import { RouteRecordRaw } from 'vue-router'

/**
 * Authorize routers
 */
const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('~/pages/home/Home.vue')
  }
]

export default asyncRoutes
