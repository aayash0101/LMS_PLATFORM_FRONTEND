import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, Clock, TrendingUp } from 'lucide-react'
import { useStudentDashboard } from '@/features/user/hooks/useStudentDashboard'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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

const DashboardSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
    </div>
    <Skeleton className="h-6 w-36" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
    </div>
  </div>
)

const StudentDashboardPage = () => {
  const { user } = useAuth()
  const { data, isLoading } = useStudentDashboard()
  const dashboard = data?.data

  if (isLoading) return <DashboardSkeleton />

  const enrollments = dashboard?.enrollments ?? []
  const totalCourses    = enrollments.length
  const completedCourses = enrollments.filter((e) => e.isCompleted).length
  const inProgress      = totalCourses - completedCourses

  const recentEnrollments = [...enrollments]
    .sort((a, b) => b.completionPercentage - a.completionPercentage)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's where you left off</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={BookOpen}     label="Enrolled Courses" value={totalCourses} />
        <StatCard icon={CheckCircle2} label="Completed"        value={completedCourses} color="text-green-600" />
        <StatCard icon={TrendingUp}   label="In Progress"      value={inProgress}   color="text-amber-500" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Continue Learning</h2>
          <LinkButton variant="ghost" size="sm" >
            <Link to="/my-courses">View all</Link>
          </LinkButton>
        </div>

        {recentEnrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground space-y-3">
              <BookOpen className="w-10 h-10 mx-auto opacity-30" />
              <p>You haven't enrolled in any courses yet.</p>
              <LinkButton >
                <Link to="/courses">Browse Courses</Link>
              </LinkButton>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentEnrollments.map((enrollment) => {
              const course = enrollment.course
              return (
                <Card key={enrollment._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                        {course?.thumbnail?.url ? (
                          <img
                            src={course.thumbnail.url}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm leading-snug line-clamp-1">
                            {course?.title}
                          </p>
                          {enrollment.isCompleted && (
                            <Badge variant="secondary" className="text-green-600 shrink-0">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{enrollment.completionPercentage ?? 0}% complete</span>
                          </div>
                          <Progress value={enrollment.completionPercentage ?? 0} className="h-1.5" />
                        </div>
                      </div>

                      {/* Action */}
                      <LinkButton size="sm" variant="outline" className="shrink-0">
                        <Link to={`/learn/${course?._id}`}>
                          {enrollment.isCompleted ? 'Review' : 'Continue'}
                        </Link>
                      </LinkButton>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboardPage