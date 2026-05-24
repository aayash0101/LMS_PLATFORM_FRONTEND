import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { loginApi } from '../api/auth.api'

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname

  return useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      setAuth(data.data.user, data.data.accessToken)
      const role = data.data.user.role
      const fallback = role === 'instructor' ? '/instructor/dashboard' : '/dashboard'
      navigate(from ?? fallback, { replace: true })
    },
  })
}