import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { registerApi } from '../api/auth.api'

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: registerApi,
    onSuccess: ({ data }) => {
      setAuth(data.data.user, data.data.accessToken)
      const role = data.data.user.role
      if (role === 'instructor') navigate('/instructor/dashboard')
      else navigate('/dashboard')
    },
  })
}