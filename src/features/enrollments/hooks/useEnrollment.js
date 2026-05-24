import { useQuery } from '@tanstack/react-query'
import { getEnrollmentApi } from '../api/enrollments.api'

export const useEnrollment = (courseId) => {
  return useQuery({
    queryKey: ['enrollment', courseId],
    queryFn: () => getEnrollmentApi(courseId).then((r) => r.data),
    enabled: !!courseId,
  })
}