import CourseCard from './CourseCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

const CardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/4" />
    </CardContent>
  </Card>
)

const CourseGrid = ({ courses, isLoading, count = 8 }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!courses?.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg">No courses found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  )
}

export default CourseGrid