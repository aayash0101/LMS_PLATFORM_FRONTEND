import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, BarChart2, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { to: '/instructor/dashboard',        label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/instructor/courses',          label: 'My Courses',   icon: BookOpen },
  { to: '/instructor/courses/create',   label: 'New Course',   icon: PlusCircle },
  { to: '/instructor/analytics',        label: 'Analytics',    icon: BarChart2 },
]

const InstructorSidebar = () => (
  <aside className="w-64 shrink-0 border-r min-h-screen bg-muted/20 p-4 space-y-1">
    <div className="px-3 py-2 mb-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Instructor
      </p>
    </div>
    {links.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/instructor/courses'}
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

export default InstructorSidebar