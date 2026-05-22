// src/layouts/StudentLayout.jsx
import { Outlet } from 'react-router-dom'

const StudentLayout = () => (
  <div className="min-h-screen flex">
    {/* Student sidebar goes here in F4 */}
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
)

export default StudentLayout