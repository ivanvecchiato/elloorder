import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/:place?',
    name: 'Home',
    props: true,
    component: Home
  },
  {
    path: '/details',
    name: 'Details',
    props: true,
    component: () => import('../views/Details.vue')
  },
  {
    path: '/catalog/:place?',
    name: 'Catalog',
    props: true,
    component: () => import('../views/Catalog.vue')
  },
  {
    path: '/comanda/:place?',
    name: 'Comanda',
    props: true,
    component: () => import('../views//Tavoli/Comanda.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
