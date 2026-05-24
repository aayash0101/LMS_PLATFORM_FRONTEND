import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { useMyEnrollments } from '@/features/enrollments/hooks/useMyEnrollments'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CourseSkeleton = () => (
  <Card>
    <CardContent className="p-5 space-y-3">
      <Skeleton className="h-36 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
    </CardContent>
  </Card>
)

const EnrollmentCard = ({ enrollment }) => {
  const course = enrollment.course
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-muted overflow-hidden">
        {course?.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2">{course?.title}</h3>
          {enrollment.isCompleted && (
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{enrollment.completionPercentage ?? 0}% complete</span>
            <span>
              {enrollment.progress?.length ?? 0} lessons done
            </span>
          </div>
          <Progress value={enrollment.completionPercentage ?? 0} className="h-2" />
        </div>

        <Button size="sm" className="w-full" asChild>
          <Link to={`/learn/${course?._id}`}>
            {enrollment.isCompleted ? 'Review Course' : 'Continue Learning'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

const MyCoursesPage = () => {
  const { data, isLoading } = useMyEnrollments()
  const enrollments = data?.data ?? []

  const inProgress = enrollments.filter((e) => !e.isCompleted)
  const completed  = enrollments.filter((e) => e.isCompleted)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-1">{enrollments.length} courses enrolled</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({enrollments.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        {['all', 'progress', 'completed'].map((tab) => {
          const list = tab === 'all' ? enrollments : tab === 'progress' ? inProgress : completed
          return (
            <TabsContent key={tab} value={tab} className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <CourseSkeleton key={i} />)}
                </div>
              ) : list.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground space-y-3">
                  <BookOpen className="w-10 h-10 mx-auto opacity-30" />
                  <p>No courses here yet.</p>
                  {tab === 'all' && (
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((enrollment) => (
                    <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default MyCoursesPage