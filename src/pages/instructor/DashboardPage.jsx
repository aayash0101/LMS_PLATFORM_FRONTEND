import { Link } from 'react-router-dom'
import { BookOpen, Users, Star, DollarSign, PlusCircle, ArrowRight } from 'lucide-react'
import { useInstructorCourses } from '@/features/courses/hooks/useInstructorCourses'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkButton } from '@/components/ui/link-button'

const StatCard = ({ icon: Icon, label, value, color = 'text-primary' }) => (
  <Card>
    <CardContent className="p-6 flex items-center gap-4">
      <div className={`p-3 rounded-full bg-primary/10 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
)

const InstructorDashboardPage = () => {
  const { user } = useAuth()
  const { data, isLoading } = useInstructorCourses()

  const courses = Array.isArray(data?.data) ? data.data : []

  const totalStudents = courses.reduce((acc, c) => acc + (c.totalStudents ?? 0), 0)
  const totalRevenue  = courses.reduce((acc, c) => acc + (c.price ?? 0) * (c.totalStudents ?? 0), 0)
  const avgRating     = courses.length
    ? courses.reduce((acc, c) => acc + (c.averageRating ?? 0), 0) / courses.length
    : 0

  if (isLoading) return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">Here's how your courses are performing</p>
        </div>
        <LinkButton >
          <Link to="/instructor/courses/create">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Course
          </Link>
        </LinkButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen}    label="Total Courses"  value={courses.length} />
        <StatCard icon={Users}       label="Total Students" value={totalStudents} color="text-blue-500" />
        <StatCard icon={Star}        label="Avg Rating"     value={avgRating.toFixed(1)} color="text-amber-500" />
        <StatCard icon={DollarSign}  label="Total Revenue"  value={`$${totalRevenue.toFixed(2)}`} color="text-green-600" />
      </div>

      {/* Recent courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Courses</h2>
          <LinkButton variant="ghost" size="sm" >
            <Link to="/instructor/courses">View all <ArrowRight className="w-3 h-3 ml-1" /></Link>
          </LinkButton>
        </div>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground opacity-30" />
              <p className="text-muted-foreground">You haven't created any courses yet.</p>
              <LinkButton >
                <Link to="/instructor/courses/create">Create your first course</Link>
              </LinkButton>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <Card key={course._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-16 h-12 rounded bg-muted overflow-hidden shrink-0">
                    {course.thumbnail?.url
                      ? <img src={course.thumbnail.url} alt={course.title} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-4 h-4 text-muted-foreground" /></div>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{course.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{course.totalStudents ?? 0} students</span>
                      <span>⭐ {course.averageRating?.toFixed(1) ?? '0.0'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                    <LinkButton size="sm" variant="outline" >
                      <Link to={`/instructor/courses/${course._id}/edit`}>Edit</Link>
                    </LinkButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InstructorDashboardPage