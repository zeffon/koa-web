const Login = () => import('~/pages/login/Login.vue')
const Home = () => import('~/pages/home/Home.vue')

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'home', component: Home }
]

export default routes
