import { Flex, GridItem, Link, SimpleGrid, Text } from '@chakra-ui/react'

import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

export function BillingsSkeleton() {
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
        paddingY="6"
        width="full"
        columns={{ base: 2, md: 12 }}
        alignItems="center"
        gap={{ base: 2, md: 6 }}
        asChild
      >
        <Link href="#">
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Skeleton height="4" width="fit-content">
              <Text fontSize="sm">Vencimento</Text>
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Skeleton key={index} height="4" width="fit-content">
              <Text>Status</Text>
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Skeleton key={index} height="4" width="fit-content">
              <Text>Cobrança</Text>
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Skeleton key={index} height="4" width="fit-content">
              <Text>Valor atual</Text>
            </Skeleton>
          </GridItem>
        </Link>
      </SimpleGrid>
      <Skeleton height="8" width="32">
        <Text>Pagar com pix</Text>
      </Skeleton>
    </Flex>
  ))
}
