import { useQuery } from '@tanstack/react-query'
import { getMyCoursesApi } from '../api/instructor.courses.api'

export const useInstructorCourses = () => {
  return useQuery({
    queryKey: ['instructor-courses'],
    queryFn: () => getMyCoursesApi().then((r) => r.data),
  })
}