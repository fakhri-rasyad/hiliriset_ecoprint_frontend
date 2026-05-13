import api from './axios'
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

export const login = async (data: LoginRequest) : Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/v1/auth/login', data)
    return response.data
}

export const register = async (data: RegisterRequest) : Promise<AuthResponse> => {
    const response = await api.post('/v1/auth/register', data)
    return response.data
}