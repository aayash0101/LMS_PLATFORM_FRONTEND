import api from '@/api/axios'

export const getCourseReviewsApi = (courseId, params) =>
  api.get(`/courses/${courseId}/reviews`, { params })

export const createReviewApi = (courseId, data) =>
  api.post(`/courses/${courseId}/reviews`, data)