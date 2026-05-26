import api from '@/api/axios'

export const initiatePaymentApi = (courseId) =>
  api.post(`/payments/esewa/initiate/${courseId}`)

export const verifyPaymentApi = (encodedData, courseId) =>
  api.get('/payments/esewa/verify', { params: { data: encodedData, courseId } })