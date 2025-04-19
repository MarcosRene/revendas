import { Outlet } from 'react-router'

import { withAuthGuard } from '@/routes/auth-guard'

function AuthLayout() {
  return <Outlet />
}

export default withAuthGuard(AuthLayout)
