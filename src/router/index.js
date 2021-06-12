import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './../components/Home.vue'
import Welcome from './../components/Welcome.vue'
import Login from './../components/Login.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    redirect: '/welcome',
    meta: {
      title: '首頁'
    },
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: Welcome,
        meta: {
          title: '歡迎頁'
        }
      },
      {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
          title: '登入頁'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
