import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReviewApi } from '../api/reviews.api'

export const useCreateReview = (courseId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => createReviewApi(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', courseId] })
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })
}