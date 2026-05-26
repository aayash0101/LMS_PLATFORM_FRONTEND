import { useMutation, useQueryClient } from '@tanstack/react-query'
import { verifyPaymentApi } from '../api/payments.api'

export const useVerifyPayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ encodedData, courseId }) =>
      verifyPaymentApi(encodedData, courseId).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ['enrollment', courseId] })
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
    },
  })
}