import { RouteRecordRaw } from 'vue-router'

/**
 * No authorize routers
 */
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('~/pages/login/Login.vue')
  }
]

export default constantRoutes
