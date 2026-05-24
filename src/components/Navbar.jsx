import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, LogOut, LayoutDashboard, Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Navbar = () => {
  const { user, isAuthenticated, isInstructor } = useAuth()
  const { mutate: logout } = useLogout()

  const dashboardPath = isInstructor ? '/instructor/dashboard' : '/dashboard'
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() ?? '?'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <BookOpen className="w-6 h-6" />
            LearnHub
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/courses"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Courses
            </Link>
          </nav>

          {/* Auth actions */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Get started</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar?.url} />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={dashboardPath} className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
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