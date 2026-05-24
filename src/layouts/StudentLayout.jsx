// src/layouts/StudentLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import StudentSidebar from '@/components/StudentSidebar'

const StudentLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1">
      <StudentSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
)

export default StudentLayout