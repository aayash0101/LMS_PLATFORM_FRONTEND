import { useMutation } from '@tanstack/react-query'
import { initiatePaymentApi } from '../api/payments.api'

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: (courseId) => initiatePaymentApi(courseId).then((r) => r.data),
  })
}
