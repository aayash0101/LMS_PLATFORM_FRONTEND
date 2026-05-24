import { useQuery } from '@tanstack/react-query'
import {
  getInstructorOverviewApi,
  getEnrollmentTimeSeriesApi,
  getCourseBreakdownApi,
} from '../api/analytics.api'

export const useInstructorOverview = () =>
  useQuery({
    queryKey: ['analytics', 'instructor', 'overview'],
    queryFn: () => getInstructorOverviewApi().then((r) => r.data),
  })

export const useEnrollmentTimeSeries = (period) =>
  useQuery({
    queryKey: ['analytics', 'instructor', 'enrollments', period],
    queryFn: () => getEnrollmentTimeSeriesApi(period).then((r) => r.data),
  })

export const useCourseBreakdown = () =>
  useQuery({
    queryKey: ['analytics', 'instructor', 'courses'],
    queryFn: () => getCourseBreakdownApi().then((r) => r.data),
  })