import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} LearnHub. All rights reserved.
    </footer>
  </div>
)

export default PublicLayout