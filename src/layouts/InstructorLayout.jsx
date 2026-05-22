import { Outlet } from 'react-router-dom'

const InstructorLayout = () => (
  <div className="min-h-screen flex">
    {/* Instructor sidebar goes here in F5 */}
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
)

export default InstructorLayout