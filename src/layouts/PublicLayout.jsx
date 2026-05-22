import { Outlet } from 'react-router-dom'

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Navbar goes here in F3 */}
    <main className="flex-1">
      <Outlet />
    </main>
    {/* Footer goes here in F3 */}
  </div>
)

export default PublicLayout