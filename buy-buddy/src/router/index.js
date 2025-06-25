import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/:catchAll(.*)',
    component:import('@/componentPage.vue')
  },
  {
    path: '/',
    name: 'componentPage',
    component: () => import('@/componentPage.vue')
  }, 
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
