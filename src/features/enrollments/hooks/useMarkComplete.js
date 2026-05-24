// src/features/enrollments/hooks/useMarkComplete.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markLessonCompleteApi } from '../api/enrollments.api'

export const useMarkComplete = (courseId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (lessonId) => markLessonCompleteApi(courseId, lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollment', courseId] })
    },
  })
}