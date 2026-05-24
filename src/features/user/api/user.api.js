import api from '@/api/axios'

export const getStudentDashboardApi = () =>
  api.get('/users/dashboard')

export const updateProfileApi = (data) =>
  api.put('/users/profile', data)

export const uploadAvatarApi = (formData) =>
  api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })