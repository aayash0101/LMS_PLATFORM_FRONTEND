import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'  
  },
})
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  console.log('Token being sent:', token)  
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isVerifyRoute = error.config?.url?.includes('/payments/esewa/verify')
    if (error.response?.status === 401 && !isVerifyRoute) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api