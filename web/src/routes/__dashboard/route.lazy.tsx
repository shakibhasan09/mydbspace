import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '@web/components/sidebar'


export const Route = createLazyFileRoute('/__dashboard')({
  component: () => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64 p-6">
        <Outlet />
      </div>
    </div>
  )
})