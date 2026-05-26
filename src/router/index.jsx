import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './guards/ProtectedRoute'
import RoleRoute from './guards/RoleRoute'

import PublicLayout from '@/layouts/PublicLayout'
import StudentLayout from '@/layouts/StudentLayout'
import InstructorLayout from '@/layouts/InstructorLayout'

import HomePage from '@/pages/public/HomePage'
import CourseCatalogPage from '@/pages/public/CourseCatalogPage'
import CourseDetailPage from '@/pages/public/CourseDetailPage'
import LoginPage from '@/pages/public/LoginPage'
import RegisterPage from '@/pages/public/RegisterPage'

import StudentDashboardPage from '@/pages/student/DashboardPage'
import MyCoursesPage from '@/pages/student/MyCoursesPage'
import LearnPage from '@/pages/student/LearnPage'

import InstructorDashboardPage from '@/pages/instructor/DashboardPage'
import InstructorCoursesPage from '@/pages/instructor/CoursesPage'
import CreateCoursePage from '@/pages/instructor/CreateCoursePage'
import EditCoursePage from '@/pages/instructor/EditCoursePage'
import AnalyticsPage from '@/pages/instructor/AnalyticsPage'
import PaymentVerifyPage from '@/pages/student/PaymentVerifyPage'

import NotFoundPage from '@/pages/NotFoundPage'
import UnauthorizedPage from '@/pages/UnauthorizedPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/',               element: <HomePage /> },
      { path: '/courses',        element: <CourseCatalogPage /> },
      { path: '/courses/:slug',  element: <CourseDetailPage /> },
      { path: '/login',          element: <LoginPage /> },
      { path: '/register',       element: <RegisterPage /> },
      { path: '/unauthorized',   element: <UnauthorizedPage /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={['student']} />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              { path: '/dashboard',   element: <StudentDashboardPage /> },
              { path: '/my-courses',  element: <MyCoursesPage /> },
            ],
          },
          { path: '/learn/:courseId', element: <LearnPage /> },
          { path: '/payment/verify',    element: <PaymentVerifyPage /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={['instructor', 'admin']} />,
        children: [
          {
            element: <InstructorLayout />,
            children: [
              { path: '/instructor/dashboard',          element: <InstructorDashboardPage /> },
              { path: '/instructor/courses',            element: <InstructorCoursesPage /> },
              { path: '/instructor/courses/create',     element: <CreateCoursePage /> },
              { path: '/instructor/courses/:id/edit',   element: <EditCoursePage /> },
              { path: '/instructor/analytics',          element: <AnalyticsPage /> },
            ],
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
])

export default router