import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { to: '/dashboard',   label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/my-courses',  label: 'My Courses', icon: BookOpen },
]

const StudentSidebar = () => (
  <aside className="w-64 shrink-0 border-r min-h-screen bg-muted/20 p-4 space-y-1">
    <div className="px-3 py-2 mb-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Student
      </p>
    </div>
    {links.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )
        }
      >
        <Icon className="w-4 h-4" />
        {label}
      </NavLink>
    ))}
  </aside>
)

export default StudentSidebar