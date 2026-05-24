import { useQuery } from '@tanstack/react-query'
import { getCourseBySlugApi } from '../api/courses.api'

export const useCourse = (slug) => {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => getCourseBySlugApi(slug).then((r) => r.data),
    enabled: !!slug,
  })
}