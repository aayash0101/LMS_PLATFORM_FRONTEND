import RegisterForm from '@/features/auth/components/RegisterForm'

const RegisterPage = () => (
  <div className="min-h-screen flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">LearnHub</h1>
        <p className="text-muted-foreground mt-1">Start learning today — it's free</p>
      </div>
      <RegisterForm />
    </div>
  </div>
)

export default RegisterPage