import api from '@/api/axios'

export const getInstructorOverviewApi = () =>
  api.get('/analytics/instructor/overview')

export const getEnrollmentTimeSeriesApi = (period = '30d') =>
  api.get('/analytics/instructor/enrollments', { params: { period } })

export const getCourseBreakdownApi = () =>
  api.get('/analytics/instructor/courses')

export const getLessonCompletionApi = (courseId) =>
  api.get(`/analytics/instructor/lessons/${courseId}`)