import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Navbar = () => {
  const { user, isAuthenticated, isInstructor } = useAuth()
  const { mutate: logout } = useLogout()
  const navigate = useNavigate()
  const dashboardPath = isInstructor ? '/instructor/dashboard' : '/dashboard'
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() ?? '?'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <BookOpen className="w-6 h-6" />
            LearnHub
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Courses
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                  Sign in
                </Link>
                <Link to="/register" className={buttonVariants({ size: 'sm' })}>
                  Get started
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity">
                      <AvatarImage src={user?.avatar?.url} />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(dashboardPath)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive flex items-center gap-2 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar