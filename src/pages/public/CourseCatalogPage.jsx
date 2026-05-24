import { useState } from 'react'
import { useCourses } from '@/features/courses/hooks/useCourses'
import CourseGrid from '@/features/courses/components/CourseGrid'
import CourseFilters from '@/features/courses/components/CourseFilters'
import Pagination from '@/components/Pagination'

const DEFAULT_FILTERS = { search: '', category: '', level: '', sort: 'newest', page: 1, limit: 12 }

const CourseCatalogPage = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const { data, isLoading } = useCourses(filters)

  const courses    = data?.data ?? []
  const pagination = data?.pagination ?? null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">All Courses</h1>
        <p className="text-muted-foreground mt-1">
          {pagination?.total ?? 0} courses available
        </p>
      </div>

      <CourseFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <CourseGrid courses={courses} isLoading={isLoading} count={12} />

      <Pagination
        pagination={pagination}
        onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
      />
    </div>
  )
}

export default CourseCatalogPage