import { List, Text } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

export function ModulesSkeleton() {
  return (
    <List.Root width="full">
      {Array.from({ length: 15 }).map((_, index) => (
        <List.Item
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          spaceY="4"
          gap="6"
        >
          <Skeleton marginInlineEnd="auto">
            <Checkbox>
              <Text fontSize="sm" fontWeight="light">
                Descrição
              </Text>
            </Checkbox>
          </Skeleton>
          <Skeleton>
            <Button variant="outline" size="xs">
              Alterar quantidade
            </Button>
          </Skeleton>
          <Skeleton width="full" maxWidth="20">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textDecoration="underline"
              textAlign="end"
            >
              R$ 00
            </Text>
          </Skeleton>
        </List.Item>
      ))}
    </List.Root>
  )
}
