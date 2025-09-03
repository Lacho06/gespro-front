import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'

export const Route = createFileRoute('/_HomeLayout')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#F8F4EA]">
      <Navbar />
      <Outlet />
    </div>
  )
}
