import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/landing/views/LandingView.vue'),
    },
    {
      path: '/login',
      name: 'auth:login',
      component: () => import('@/features/auth/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'auth:register',
      component: () => import('@/features/auth/views/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard:overview',
      component: () => import('@/features/dashboard/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('access_token')
  if (to.meta.requiresAuth && !token) {
    return { name: 'auth:login' }
  }
})

export default router
