import { useQuery } from '@tanstack/react-query'
import { getCoursesApi } from '../api/courses.api'

export const useCourses = (filters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => getCoursesApi(filters).then((r) => r.data),
    keepPreviousData: true,   
  })
}