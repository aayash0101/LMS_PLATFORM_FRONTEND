import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCourseApi, publishCourseApi } from '../api/instructor.courses.api'

export const useUpdateCourse = (id) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => updateCourseApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
      queryClient.invalidateQueries({ queryKey: ['course'] })
    },
  })
}

export const usePublishCourse = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => publishCourseApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
      queryClient.invalidateQueries({ queryKey: ['course', id] }) 
    },
  })
}