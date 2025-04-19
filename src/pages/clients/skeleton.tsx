import {
  Flex,
  GridItem,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'

export function ClientsSkeleton() {
  const widths = ['28', '44', '32']

  return Array.from({ length: 5 }).map((_, index) => (
    <Flex
      key={index}
      paddingX="4"
      borderRadius="l3"
      borderWidth="thin"
      borderColor="zinc.200"
      borderStyle="solid"
      alignItems="center"
      justifyContent="space-between"
      gap="3"
    >
      <Skeleton boxSize="5" loading>
        <Checkbox aria-label="Select row" />
      </Skeleton>
      <SimpleGrid
        paddingX="4"
        paddingY="3"
        width="full"
        columns={{ base: 1, md: 12 }}
        alignItems="center"
        gap={{ base: 2, md: 6 }}
        asChild
      >
        <Link href="#">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <VStack alignItems="flex-start" gap="1">
              <Skeleton height="4" width="fit-content">
                <Text fontSize="sm">Plano</Text>
              </Skeleton>
              <Skeleton height="4" width="fit-content">
                <Tag>Liberado</Tag>
              </Skeleton>
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 5 }}>
            <Stack gap="2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height="4"
                  width={widths[index % widths.length]}
                >
                  <Text>Client</Text>
                </Skeleton>
              ))}
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 5 }}>
            <Stack gap="2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height="4"
                  width={widths[index % widths.length]}
                >
                  <Text>Cobrança</Text>
                </Skeleton>
              ))}
            </Stack>
          </GridItem>
        </Link>
      </SimpleGrid>
      <Skeleton height="8" width="32">
        <Text>Pagar com pix</Text>
      </Skeleton>
    </Flex>
  ))
}
