import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createCourseApi } from '../api/instructor.courses.api'

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
      navigate(`/instructor/courses/${data.data.course._id}/edit`)
    },
  })
}