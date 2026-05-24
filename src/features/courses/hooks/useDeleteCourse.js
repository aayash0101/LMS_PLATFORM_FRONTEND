import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCourseApi } from '../api/instructor.courses.api'

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
    },
  })
}