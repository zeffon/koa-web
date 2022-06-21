import { RouteRecordRaw } from 'vue-router'

/**
 * No authorize exception routers
 */
const exceptionRoutes: Array<RouteRecordRaw> = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '非常抱歉,页面走丢了'
    },
    component: () => import('~/pages/exception/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    meta: {},
    redirect: '/404'
  }
]

export default exceptionRoutes
