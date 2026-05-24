import LoginForm from '@/features/auth/components/LoginForm'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated) {
    const dest = user?.role === 'instructor' ? '/instructor/dashboard' : '/dashboard'
    return <Navigate to={dest} replace />
  }

  return (
   <div className="min-h-screen flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">LearnHub</h1>
        <p className="text-muted-foreground mt-1">Your learning journey continues here</p>
      </div>
      <LoginForm />
    </div>
  </div>
  )
}

export default LoginPage;