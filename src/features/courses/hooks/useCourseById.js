import { useQuery } from '@tanstack/react-query'
import { getCourseByIdApi } from '../api/courses.api'

export const useCourseById = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseByIdApi(id).then((r) => r.data),
    enabled: !!id,
  })
}