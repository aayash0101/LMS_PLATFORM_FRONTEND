import api from '@/api/axios'

export const getCoursesApi = (params) =>
  api.get('/courses', { params })

export const getCourseBySlugApi = (slug) =>
  api.get(`/courses/${slug}`)

export const getInstructorPublicProfileApi = (id) =>
  api.get(`/users/instructor/${id}`)

export const getCourseByIdApi = (id) =>
  api.get(`/courses/${id}`)