import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import InstructorSidebar from '@/components/InstructorSidebar'

const InstructorLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex flex-1">
      <InstructorSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
)

export default InstructorLayout