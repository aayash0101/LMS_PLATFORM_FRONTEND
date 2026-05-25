// src/pages/instructor/CoursesPage.jsx
import { Link } from 'react-router-dom'
import { PlusCircle, Pencil, Trash2, BookOpen } from 'lucide-react'
import { useInstructorCourses } from '@/features/courses/hooks/useInstructorCourses'
import { useDeleteCourse } from '@/features/courses/hooks/useDeleteCourse'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkButton } from '@/components/ui/link-button'

const CoursesPage = () => {
    const { data, isLoading } = useInstructorCourses()
    const { mutate: deleteCourse, isPending: deleting } = useDeleteCourse()

    const courses = data?.data?.courses ?? []

    if (isLoading) return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    <p className="text-muted-foreground mt-1">{courses.length} courses</p>
                </div>
                <LinkButton to="/instructor/courses/create">
                    Create Course
                </LinkButton>
            </div>

            {courses.length === 0 ? (
                <Card>
                    <CardContent className="py-16 text-center space-y-3">
                        <BookOpen className="w-10 h-10 mx-auto text-muted-foreground opacity-30" />
                        <p className="text-muted-foreground">No courses yet.</p>
                        <LinkButton to="/instructor/courses/create">
                            Create Course
                        </LinkButton>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {courses.map((course) => (
                        <Card key={course._id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-20 h-14 rounded bg-muted overflow-hidden shrink-0">
                                    {course.thumbnail?.url
                                        ? <img src={course.thumbnail.url} className="w-full h-full object-cover" alt={course.title} />
                                        : <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    }
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <p className="font-medium text-sm line-clamp-1">{course.title}</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>{course.totalStudents ?? 0} students</span>
                                        <span>⭐ {course.averageRating?.toFixed(1) ?? '0.0'}</span>
                                        <span className="capitalize">{course.level}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                                    <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                                        {course.isPublished ? 'Published' : 'Draft'}
                                    </Badge>
                                    <LinkButton size="sm" variant="outline" to={`/instructor/courses/${course._id}/edit`}>
                                        <Pencil className="w-3.5 h-3.5 mr-1.5" />
                                        Edit
                                    </LinkButton>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-destructive"
                                        disabled={deleting}
                                        onClick={() => deleteCourse(course._id)}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CoursesPage