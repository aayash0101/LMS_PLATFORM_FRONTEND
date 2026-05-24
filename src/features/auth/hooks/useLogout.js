import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { logoutApi } from '../api/auth.api'

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      logout()
      queryClient.clear()   
      navigate('/login', { replace: true })
    },
  })
}