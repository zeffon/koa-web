import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import asyncRoutes from './route.async'
import constantRoutes from './route.constant'
import exceptionRoutes from './route.exception'

/**
 * Do not modify the order of these three routes
 */
const routes: Array<RouteRecordRaw> = [
  ...constantRoutes,
  ...asyncRoutes,
  ...exceptionRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
