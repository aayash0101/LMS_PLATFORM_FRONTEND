import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createSectionApi, updateSectionApi, deleteSectionApi,
} from '../api/instructor.courses.api'

export const useCreateSection = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createSectionApi(courseId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}

export const useUpdateSection = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ sectionId, data }) => updateSectionApi(courseId, sectionId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}

export const useDeleteSection = (courseId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (sectionId) => deleteSectionApi(courseId, sectionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}