import { useQuery } from '@tanstack/react-query'
import { getStudentDashboardApi } from '../api/user.api'

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ['student-dashboard'],
    queryFn: () => getStudentDashboardApi().then((r) => r.data),
  })
}