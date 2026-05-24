import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CourseGrid from '@/features/courses/components/CourseGrid'
import { useCourses } from '@/features/courses/hooks/useCourses'

const STATS = [
  { icon: BookOpen, label: 'Courses', value: '500+' },
  { icon: Users,    label: 'Students', value: '50,000+' },
  { icon: Award,    label: 'Instructors', value: '200+' },
]

const HomePage = () => {
  const { data, isLoading } = useCourses({ limit: 8, sort: 'popular' })
  const courses = data?.data ?? []

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Learn Without{' '}
            <span className="text-primary">Limits</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your skills with expert-led courses. Learn at your own pace,
            on any device, anytime.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link to="/courses">
                Browse Courses <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Start Teaching</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="space-y-1">
              <Icon className="w-6 h-6 mx-auto text-primary" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Most Popular Courses</h2>
            <p className="text-muted-foreground mt-1">Join thousands of learners today</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/courses">View all</Link>
          </Button>
        </div>
        <CourseGrid courses={courses} isLoading={isLoading} count={8} />
      </section>
    </div>
  )
}

export default HomePage