import { useMutation, useQueryClient } from '@tanstack/react-query'
import { verifyPaymentApi } from '../api/payments.api'

export const useVerifyPayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ encodedData, courseId }) =>
      verifyPaymentApi(encodedData, courseId)
        .then((r) => r.data)
        .catch((err) => {
          if (err.response?.status === 409) {
            return { alreadyProcessed: true }
          }
          throw err
        }),
    onSuccess: (_, { courseId }) => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['enrollment', courseId] })
        queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      }, 1000)
    },
  })
}