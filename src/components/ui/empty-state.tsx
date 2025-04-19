import { EmptyState as ChakraEmptyState, Image, VStack } from '@chakra-ui/react'
import * as React from 'react'

import emptyState from '@/assets/images/empty-state.svg'

export interface EmptyStateProps extends ChakraEmptyState.RootProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

const iconCustom = (
  <Image
    src={emptyState}
    alt="Desenho de um boneco verde; mulher; flechas de sincronização"
    maxHeight="36"
  />
)

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon = iconCustom, children, ...rest } = props
    return (
      <ChakraEmptyState.Root ref={ref} {...rest}>
        <ChakraEmptyState.Content>
          {icon && (
            <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
          )}
          {description ? (
            <VStack textAlign="center">
              <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
              <ChakraEmptyState.Description>
                {description}
              </ChakraEmptyState.Description>
            </VStack>
          ) : (
            <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
          )}
          {children}
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    )
  }
)
