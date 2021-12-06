import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

//  Layouts
import defaultLayout from '@/layouts/default.vue'
import authenticatedLayout from '@/layouts/authenticated.vue'

//  Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: authenticatedLayout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: defaultLayout,
    children: [
      {
        path: 'Login',
        component: Login
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
