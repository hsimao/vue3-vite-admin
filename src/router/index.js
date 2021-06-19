import { createRouter, createWebHashHistory } from 'vue-router'
import AdminLayout from '@/components/Layout/AdminLayout.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: AdminLayout,
    redirect: '/welcome',
    meta: {
      title: '首頁'
    },
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: {
          title: '歡迎頁'
        }
      },
      {
        name: 'user',
        path: '/system/user',
        component: () => import('@/views/User.vue'),
        meta: {
          title: '用戶管理'
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登入'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
