import { useQuery } from '@tanstack/react-query'
import { getMyEnrollmentsApi } from '../api/enrollments.api'

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['enrollments'],
    queryFn: () => getMyEnrollmentsApi().then((r) => r.data),
  })
}