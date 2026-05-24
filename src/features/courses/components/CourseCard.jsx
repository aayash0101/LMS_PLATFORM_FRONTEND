import { Link } from 'react-router-dom'
import { Star, Users, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
        {/* Thumbnail */}
        <div className="aspect-video bg-muted overflow-hidden">
          {course.thumbnail?.url ? (
            <img
              src={course.thumbnail.url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <BookOpen className="w-10 h-10 text-primary/40" />
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category + Level */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">{course.category}</Badge>
            <Badge variant="outline" className="text-xs">{course.level}</Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground">
            {course.instructor?.name ?? 'Instructor'}
          </p>

          {/* Rating + Students */}
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-500" />
              {course.averageRating?.toFixed(1) ?? '0.0'}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              {course.totalStudents ?? 0}
            </span>
          </div>

          {/* Price */}
          <div className="pt-1 border-t">
            {course.isFree ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              <span className="font-semibold">${course.price?.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CourseCard