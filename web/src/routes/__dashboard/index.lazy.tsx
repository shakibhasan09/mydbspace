import { createLazyFileRoute, redirect } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__dashboard/')({
  beforeLoad: () => {
    throw redirect({ to: '/__dashboard/dblist' })
  }
})