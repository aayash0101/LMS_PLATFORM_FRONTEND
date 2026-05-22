import { useAuthStore } from '@/store/authStore'

export const useAuth = () => {
  const user  = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const setAuth  = useAuthStore((s) => s.setAuth)
  const updateUser = useAuthStore((s) => s.updateUser)
  const logout = useAuthStore((s) => s.logout)

  return {
    user,
    token,
    isAuthenticated: !!token,
    isStudent:    user?.role === 'student',
    isInstructor: user?.role === 'instructor',
    isAdmin:      user?.role === 'admin',
    setAuth,
    updateUser,
    logout,
  }
}