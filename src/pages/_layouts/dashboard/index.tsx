import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { Sidebar } from '@/components/sidebar'
import { ClientFormProvider } from '@/contexts/client-form'
import { withAuthGuard } from '@/routes/auth-guard'

function DashboardLayout() {
  return (
    <Flex
      width="full"
      height="100vh"
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
    >
      <Sidebar />

      <ClientFormProvider initialFormState={{ plan: null, modules: [] }}>
        <Outlet />
      </ClientFormProvider>
    </Flex>
  )
}

export default withAuthGuard(DashboardLayout, {
  isPrivate: true,
})
