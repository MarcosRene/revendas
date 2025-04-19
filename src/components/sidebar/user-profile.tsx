import { Flex, IconButton, Stack, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'

import { Avatar } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'

export function UserProfile() {
  const { signOut, user, isLoggingOut } = useAuth()

  return (
    <Stack spaceY="4">
      <Flex maxWidth="full" alignItems="center" gap="4">
        <Avatar name={user?.name} size="lg" colorPalette="purple" />

        <Stack maxWidth={{ base: '40', lg: '36' }} gap="0">
          <Text fontSize="sm" color="zinc.700" fontWeight="medium" truncate>
            {user?.name}
          </Text>
          <Text fontSize="sm" color="zinc.700" truncate>
            {user?.email}
          </Text>
        </Stack>

        <IconButton
          onClick={signOut}
          variant="ghost"
          colorPalette="zinc"
          size="sm"
          borderRadius="l2"
          disabled={isLoggingOut}
        >
          <FiLogOut />
        </IconButton>
      </Flex>
    </Stack>
  )
}
