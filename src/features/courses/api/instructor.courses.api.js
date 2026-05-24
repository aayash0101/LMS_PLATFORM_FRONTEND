// src/features/courses/api/instructor.courses.api.js
import api from '@/api/axios'

export const getMyCoursesApi = () =>
  api.get('/courses/instructor/my-courses')

export const createCourseApi = (data) =>
  api.post('/courses', data)

export const updateCourseApi = (id, data) =>
  api.put(`/courses/${id}`, data)

export const deleteCourseApi = (id) =>
  api.delete(`/courses/${id}`)

export const publishCourseApi = (id) =>
  api.put(`/courses/${id}/publish`)

export const uploadThumbnailApi = (id, formData) =>
  api.post(`/courses/${id}/thumbnail`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

// ── Sections ──────────────────────────────────────────────────────────────
export const getSectionsApi = (courseId) =>
  api.get(`/courses/${courseId}/sections`)

export const createSectionApi = (courseId, data) =>
  api.post(`/courses/${courseId}/sections`, data)

export const updateSectionApi = (courseId, sectionId, data) =>
  api.put(`/courses/${courseId}/sections/${sectionId}`, data)

export const deleteSectionApi = (courseId, sectionId) =>
  api.delete(`/courses/${courseId}/sections/${sectionId}`)

// ── Lessons ───────────────────────────────────────────────────────────────
export const createLessonApi = (courseId, sectionId, data) =>
  api.post(`/courses/${courseId}/sections/${sectionId}/lessons`, data)

export const updateLessonApi = (courseId, sectionId, lessonId, data) =>
  api.put(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`, data)

export const deleteLessonApi = (courseId, sectionId, lessonId) =>
  api.delete(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`)

export const uploadLessonVideoApi = (courseId, sectionId, lessonId, formData) =>
  api.post(
    `/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/video`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )