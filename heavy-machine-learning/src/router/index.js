import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'
import App from '@/App'
import ImageDetail from '@/components/ImageDetail'
const routes = [
  {
    path: '/',
    name: '/',
    component: App
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/image/:id',
    name: 'ImageDetail',
    component: ImageDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
