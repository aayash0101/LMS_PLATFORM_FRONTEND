import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enrollInCourseApi } from '../api/enrollments.api'

export const useEnroll = (courseId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => enrollInCourseApi(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['enrollment', courseId] })
    },
  })
}