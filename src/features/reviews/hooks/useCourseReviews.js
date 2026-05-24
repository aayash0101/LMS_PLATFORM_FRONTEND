import { useQuery } from '@tanstack/react-query'
import { getCourseReviewsApi } from '../api/reviews.api'

export const useCourseReviews = (courseId) => {
  return useQuery({
    queryKey: ['reviews', courseId],
    queryFn: () => getCourseReviewsApi(courseId).then((r) => r.data),
    enabled: !!courseId,
  })
}