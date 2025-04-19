import { Text, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import { SectionRoot } from '@/components/section'
import { withAuthGuard } from '@/routes/auth-guard'

export function ForgotLayout() {
  return (
    <SectionRoot
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="full"
      height="vh"
      paddingBottom="6"
    >
      <VStack spaceY="8" width={{ base: 'full', md: 'md' }}>
        <Text fontSize="2xl" fontWeight="bold">
          Recuperar senha
        </Text>

        <Outlet />
      </VStack>
    </SectionRoot>
  )
}

export default withAuthGuard(ForgotLayout)
