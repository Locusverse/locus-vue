import { httpService } from '@/shared/services/http.service'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth.types'

export const authService = {
  login(data: LoginRequest): Promise<AuthResponse> {
    return httpService.post<AuthResponse>('/auth/login', data)
  },

  register(data: RegisterRequest): Promise<AuthResponse> {
    return httpService.post<AuthResponse>('/auth/register', data)
  },

  getProfile(): Promise<User> {
    return httpService.get<User>('/auth/profile')
  },
}
