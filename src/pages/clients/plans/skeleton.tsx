import { Card, Flex, SimpleGrid } from '@chakra-ui/react'

import { Skeleton } from '@/components/ui/skeleton'

export function PlanSkeleton() {
  return (
    <SimpleGrid minChildWidth="17.5rem" gap="4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card.Root
          borderBottomWidth="thick"
          borderBottomColor="gray.200"
          key={index}
        >
          <Card.Header>
            <Card.Title
              as="div"
              height="10"
              display="grid"
              placeContent="center"
            >
              <Skeleton height="6" width="44" variant="shine" loading />
            </Card.Title>
            <Card.Description
              as="div"
              marginTop="2"
              height="16"
              spaceY="2"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton height="4" width="44" variant="shine" />
              <Skeleton height="4" width="60" variant="shine" />
            </Card.Description>

            <Flex justifyContent="center" alignItems="center">
              <Skeleton height="1.875rem" width="28" variant="shine" />
            </Flex>
          </Card.Header>
          <Card.Body display="grid" placeContent="center">
            <Skeleton height="8" width="32" variant="shine" />
          </Card.Body>
          <Card.Footer display="grid" placeContent="center">
            <Skeleton height="8" width="20" variant="shine" />
          </Card.Footer>
        </Card.Root>
      ))}
    </SimpleGrid>
  )
}
