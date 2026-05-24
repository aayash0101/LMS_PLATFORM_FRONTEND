import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createLessonApi, updateLessonApi, deleteLessonApi, uploadLessonVideoApi,
} from '../api/instructor.courses.api'

export const useCreateLesson = (courseId, sectionId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createLessonApi(courseId, sectionId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}

export const useUpdateLesson = (courseId, sectionId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ lessonId, data }) => updateLessonApi(courseId, sectionId, lessonId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}

export const useDeleteLesson = (courseId, sectionId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (lessonId) => deleteLessonApi(courseId, sectionId, lessonId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}

export const useUploadVideo = (courseId, sectionId, lessonId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData) => uploadLessonVideoApi(courseId, sectionId, lessonId, formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['course', courseId] }),
  })
}