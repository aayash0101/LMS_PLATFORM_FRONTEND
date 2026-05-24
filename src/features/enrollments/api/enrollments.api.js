import api from '@/api/axios'

export const enrollInCourseApi = (courseId) =>
  api.post(`/enrollments/${courseId}`)

export const getMyEnrollmentsApi = () =>
  api.get('/enrollments/my-courses')

export const getEnrollmentApi = (courseId) =>
  api.get(`/enrollments/${courseId}`)

export const markLessonCompleteApi = (courseId, lessonId) =>
  api.post(`/enrollments/${courseId}/progress/${lessonId}`)

export const getCourseProgressApi = (courseId) =>
  api.get(`/enrollments/${courseId}/progress`)