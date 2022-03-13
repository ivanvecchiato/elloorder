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
    path: '/info',
    name: 'Info',
    component: () => import('../views/Info.vue')
  },
  {
    path: '/listino',
    name: 'ConfigListino',
    component: () => import('../views/Admin/ConfigListino.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/Admin.vue')
  },
  {
    path: '/details',
    name: 'Details',
    props: true,
    component: () => import('../views/Details.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    props: true,
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/catalog/:place?',
    name: 'Catalog',
    props: true,
    component: () => import('../views/Catalog.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
