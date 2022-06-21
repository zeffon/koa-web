import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '~/features/auth/tool'
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

const Whitelist = ['login', '401', '404']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next()
  } else {
    if (Whitelist.includes(to.name as string)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
