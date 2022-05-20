import { createRouter, createWebHashHistory } from 'vue-router'

const Home = { template: import('../pages/login/Login.vue') }
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
