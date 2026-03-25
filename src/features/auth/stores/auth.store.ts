import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types'
import type { ApiError } from '@/shared/types/api.types'

const TOKEN_KEY = 'access_token'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  function setAuth(response: AuthResponse) {
    accessToken.value = response.accessToken
    user.value = response.user
    localStorage.setItem(TOKEN_KEY, response.accessToken)
    error.value = null
  }

  function clearAuth() {
    accessToken.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function login(data: LoginRequest) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(data)
      setAuth(response)
      await router.push({ name: 'dashboard:overview' })
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Login failed. Please try again.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterRequest) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(data)
      setAuth(response)
      await router.push({ name: 'dashboard:overview' })
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message || 'Registration failed. Please try again.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProfile() {
    if (!accessToken.value) return
    try {
      user.value = await authService.getProfile()
    } catch {
      clearAuth()
    }
  }

  function logout() {
    clearAuth()
    router.push({ name: 'auth:login' })
  }

  return {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    fetchProfile,
    logout,
  }
})
