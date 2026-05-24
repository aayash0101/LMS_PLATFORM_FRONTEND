import { useEnroll } from '@/features/enrollments/hooks/useEnroll'
import { useEnrollment } from '@/features/enrollments/hooks/useEnrollment'
import { useParams, Link } from 'react-router-dom'
import {
    Star, Users, Clock, BookOpen, CheckCircle2,
    BarChart, Globe, Award
} from 'lucide-react'
import { useCourse } from '@/features/courses/hooks/useCourse'
import { useCourseReviews } from '@/features/reviews/hooks/useCourseReviews'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

const DetailSkeleton = () => (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
    </div>
)

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star
                key={s}
                className={`w-4 h-4 ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
            />
        ))}
    </div>
)

const CourseDetailPage = () => {
    const { slug } = useParams()
    const { isAuthenticated } = useAuth()
    const { data: enrollmentData } = useEnrollment(isAuthenticated ? course?._id : null)
    const enrollment = enrollmentData?.data
    const { mutate: enroll, isPending: enrolling } = useEnroll(course?._id)

    const { data: courseData, isLoading } = useCourse(slug)
    const course = courseData?.data

    const { data: reviewsData } = useCourseReviews(course?._id)
    const reviews = reviewsData?.data ?? []


    if (isLoading) return <DetailSkeleton />
    if (!course) return (
        <div className="text-center py-20 text-muted-foreground">Course not found</div>
    )

    const totalLessons = course.sections?.reduce(
        (acc, s) => acc + (s.lessons?.length ?? 0), 0
    ) ?? 0

    return (
        <div className="min-h-screen">
            <div className="bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex gap-2 flex-wrap">
                                <Badge variant="secondary">{course.category}</Badge>
                                <Badge variant="outline" className="text-slate-300 border-slate-600 capitalize">
                                    {course.level}
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold leading-tight">{course.title}</h1>
                            <p className="text-slate-300 text-lg line-clamp-3">{course.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <strong className="text-white">{course.averageRating?.toFixed(1)}</strong>
                                    <span>({course.totalRatings} ratings)</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {course.totalStudents} students
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {totalLessons} lessons
                                </span>
                            </div>

                            <p className="text-slate-300 text-sm">
                                Created by{' '}
                                <span className="text-white font-medium">
                                    {course.instructor?.name}
                                </span>
                            </p>
                        </div>

                        <div className="bg-white text-foreground rounded-xl shadow-2xl p-6 space-y-4">
                            {course.thumbnail?.url && (
                                <img
                                    src={course.thumbnail.url}
                                    alt={course.title}
                                    className="w-full aspect-video object-cover rounded-lg"
                                />
                            )}
                            <div className="text-3xl font-bold">
                                {course.isFree ? (
                                    <span className="text-green-600">Free</span>
                                ) : (
                                    `$${course.price?.toFixed(2)}`
                                )}
                            </div>
                            {!isAuthenticated ? (
                                <Button className="w-full" size="lg" asChild>
                                    <Link to="/register">Enroll Now — It's Free</Link>
                                </Button>
                            ) : enrollment ? (
                                <Button className="w-full" size="lg" asChild>
                                    <Link to={`/learn/${course._id}`}>Go to Course</Link>
                                </Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={() => enroll()}
                                    disabled={enrolling}
                                >
                                    {enrolling ? 'Enrolling...' : `Enroll${course.isFree ? ' for Free' : ` — $${course.price?.toFixed(2)}`}`}
                                </Button>
                            )}
                            <p className="text-xs text-center text-muted-foreground">
                                30-Day Money-Back Guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2 space-y-10">

                        {course.objectives?.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-xl font-bold">What you'll learn</h2>
                                <div className="grid sm:grid-cols-2 gap-2 border rounded-lg p-6">
                                    {course.objectives.map((obj, i) => (
                                        <div key={i} className="flex gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                            <span>{obj}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {course.requirements?.length > 0 && (
                            <section className="space-y-3">
                                <h2 className="text-xl font-bold">Requirements</h2>
                                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                                    {course.requirements.map((r, i) => <li key={i}>{r}</li>)}
                                </ul>
                            </section>
                        )}

                        {course.sections?.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-xl font-bold">Course Content</h2>
                                <p className="text-sm text-muted-foreground">
                                    {course.sections.length} sections • {totalLessons} lessons
                                </p>
                                <Accordion type="multiple" className="border rounded-lg divide-y">
                                    {course.sections.map((section) => (
                                        <AccordionItem key={section._id} value={section._id} className="px-4">
                                            <AccordionTrigger className="text-sm font-medium">
                                                <span>{section.title}</span>
                                                <span className="text-muted-foreground ml-auto mr-4 font-normal text-xs">
                                                    {section.lessons?.length ?? 0} lessons
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="space-y-1 pb-2">
                                                    {section.lessons?.map((lesson) => (
                                                        <li key={lesson._id} className="flex items-center gap-2 text-sm py-1">
                                                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                                            <span className={lesson.isPreview ? 'text-primary' : ''}>
                                                                {lesson.title}
                                                            </span>
                                                            {lesson.isPreview && (
                                                                <Badge variant="outline" className="text-xs ml-auto">Preview</Badge>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </section>
                        )}

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold">
                                Student Reviews
                                <span className="text-muted-foreground text-base font-normal ml-2">
                                    ({reviews.length})
                                </span>
                            </h2>
                            {reviews.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No reviews yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="space-y-1 border-b pb-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={review.student?.avatar?.url} />
                                                    <AvatarFallback className="text-xs">
                                                        {review.student?.name?.[0] ?? '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{review.student?.name}</p>
                                                    <StarRating rating={review.rating} />
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-muted-foreground ml-11">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailPage