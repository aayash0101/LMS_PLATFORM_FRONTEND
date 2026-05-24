// src/pages/student/LearnPage.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight,
  BookOpen, Menu, X, ArrowLeft
} from 'lucide-react'
import { useEnrollment } from '@/features/enrollments/hooks/useEnrollment'
import { useMarkComplete } from '@/features/enrollments/hooks/useMarkComplete'
import { useCourse } from '@/features/courses/hooks/useCourse'
import { useEnroll } from '@/features/enrollments/hooks/useEnroll'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const VideoPlayer = ({ url, onEnded }) => {
  if (!url) return (
    <div className="aspect-video bg-slate-900 flex items-center justify-center">
      <div className="text-center text-slate-400 space-y-2">
        <BookOpen className="w-12 h-12 mx-auto opacity-40" />
        <p className="text-sm">No video for this lesson</p>
      </div>
    </div>
  )

  return (
    <div className="aspect-video bg-black">
      <video
        key={url}           
        className="w-full h-full"
        controls
        autoPlay
        onEnded={onEnded}
        src={url}
      />
    </div>
  )
}

const LessonItem = ({ lesson, isActive, isCompleted, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full text-left flex items-start gap-3 px-4 py-3 text-sm transition-colors',
      isActive
        ? 'bg-primary/10 text-primary border-r-2 border-primary'
        : 'hover:bg-accent text-muted-foreground hover:text-foreground'
    )}
  >
    <span className="mt-0.5 shrink-0">
      {isCompleted
        ? <CheckCircle2 className="w-4 h-4 text-green-500" />
        : <Circle className="w-4 h-4" />
      }
    </span>
    <span className="leading-snug">{lesson.title}</span>
  </button>
)

const LearnPage = () => {
  const { courseId } = useParams()
  const { isAuthenticated, isStudent } = useAuth()
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen]   = useState(true)
  const [activeLesson, setActiveLesson] = useState(null)

  const { data: enrollmentData, isLoading: enrollmentLoading } = useEnrollment(courseId)
  const enrollment = enrollmentData?.data

  const { data: courseData, isLoading: courseLoading } = useCourse(courseId)
  const course = courseData?.data

  const { mutate: markComplete, isPending: marking } = useMarkComplete(courseId)
  const { mutate: enroll, isPending: enrolling } = useEnroll(courseId)

  const allLessons = course?.sections?.flatMap((s) => s.lessons ?? []) ?? []

  const completedIds = new Set(enrollment?.progress?.map((p) => p.lesson) ?? [])

  useEffect(() => {
    if (allLessons.length && !activeLesson) {
      const firstIncomplete = allLessons.find((l) => !completedIds.has(l._id))
      setActiveLesson(firstIncomplete ?? allLessons[0])
    }
  }, [course, enrollment])

  const currentIndex   = allLessons.findIndex((l) => l._id === activeLesson?._id)
  const prevLesson     = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson     = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const isCompleted    = completedIds.has(activeLesson?._id)

  const handleMarkComplete = () => {
    if (!activeLesson || isCompleted || marking) return
    markComplete(activeLesson._id, {
      onSuccess: () => nextLesson && setActiveLesson(nextLesson),
    })
  }

  if (enrollmentLoading || courseLoading) return (
    <div className="min-h-screen flex flex-col">
      <Skeleton className="h-14 w-full" />
      <div className="flex flex-1">
        <Skeleton className="w-72 h-full" />
        <div className="flex-1 p-8 space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  )

  if (!enrollment) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 max-w-sm">
        <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-bold">Not enrolled</h2>
        <p className="text-muted-foreground text-sm">
          You need to enroll in this course to access the content.
        </p>
        <Button
          onClick={() => enroll()}
          disabled={enrolling}
          className="w-full"
        >
          {enrolling ? 'Enrolling...' : 'Enroll Now'}
        </Button>
        <Button variant="ghost" asChild className="w-full">
          <Link to="/courses">Back to courses</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <header className="h-14 border-b flex items-center gap-4 px-4 sticky top-0 z-50 bg-background">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/my-courses">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm line-clamp-1">{course?.title}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Progress value={enrollment.completionPercentage ?? 0} className="w-24 h-1.5" />
            <span>{enrollment.completionPercentage ?? 0}%</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <div className="flex-1 overflow-y-auto">
          <VideoPlayer
            url={activeLesson?.video?.url}
            onEnded={handleMarkComplete}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <h1 className="text-xl font-bold">{activeLesson?.title}</h1>
                {activeLesson?.description && (
                  <p className="text-muted-foreground text-sm">{activeLesson.description}</p>
                )}
              </div>
              {isCompleted ? (
                <Badge variant="secondary" className="text-green-600 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Completed
                </Badge>
              ) : (
                <Button
                  size="sm"
                  onClick={handleMarkComplete}
                  disabled={marking}
                >
                  {marking ? 'Saving...' : 'Mark as Complete'}
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                disabled={!prevLesson}
                onClick={() => prevLesson && setActiveLesson(prevLesson)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} / {allLessons.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!nextLesson}
                onClick={() => nextLesson && setActiveLesson(nextLesson)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <aside className="w-72 xl:w-80 shrink-0 border-l overflow-y-auto hidden md:block">
            <div className="p-4 border-b sticky top-0 bg-background z-10">
              <p className="font-semibold text-sm">Course Content</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {completedIds.size} / {allLessons.length} completed
              </p>
            </div>

            {course?.sections?.map((section) => (
              <div key={section._id}>
                {/* Section header */}
                <div className="px-4 py-2.5 bg-muted/40 border-b">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {section.title}
                  </p>
                </div>

                {/* Lessons */}
                {section.lessons?.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson}
                    isActive={activeLesson?._id === lesson._id}
                    isCompleted={completedIds.has(lesson._id)}
                    onClick={() => setActiveLesson(lesson)}
                  />
                ))}
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  )
}

export default LearnPage