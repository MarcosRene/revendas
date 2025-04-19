import { Box, Card, HStack, Stack } from '@chakra-ui/react'

import { Skeleton, SkeletonText } from '@/components/ui/skeleton'

export function SettingsSkeleton() {
  return (
    <Box
      width="full"
      display="grid"
      gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      gap="4"
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <Card.Root
          key={index}
          padding="3"
          borderColor="zinc.200"
          borderRadius="l3"
        >
          <HStack spaceX={{ base: 2, md: 8 }} justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="2">
              <Skeleton rounded="l3" height="12" width="12" />
              <Stack gap="0">
                <SkeletonText width="32" noOfLines={2} />
              </Stack>
            </Box>

            <Skeleton height="8" width="16" rounded="l3" />
          </HStack>
        </Card.Root>
      ))}
    </Box>
  )
}
