import {
  HStack,
  Stack,
  type StackProps,
  Text,
  type TextProps,
  VStack,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

interface SectionRootProps extends StackProps {}

export const SectionRoot = forwardRef<HTMLDivElement, SectionRootProps>(
  function SectionRoot({ children, ...props }, ref) {
    return (
      <Stack
        height="full"
        spaceY="6"
        padding="6"
        paddingBottom="28"
        as="section"
        overflow="scroll"
        flex="1"
        ref={ref}
        {...props}
      >
        {children}
      </Stack>
    )
  }
)

interface SectionHeaderProps extends StackProps {}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function SectionHeader({ children, ...props }, ref) {
    return (
      <VStack alignItems="flex-start" ref={ref} {...props}>
        {children}
      </VStack>
    )
  }
)

interface SectionTitleProps extends TextProps {}

export const SectionTitle = forwardRef<HTMLDivElement, SectionTitleProps>(
  function SectionTitle({ children, ...props }, ref) {
    return (
      <Text fontSize="2xl" fontWeight="semibold" ref={ref} {...props}>
        {children}
      </Text>
    )
  }
)

interface SectionDescriptionProps extends TextProps {}

export const SectionDescription = forwardRef<
  HTMLDivElement,
  SectionDescriptionProps
>(function SectionDescription({ children, ...props }, ref) {
  return (
    <Text fontSize="sm" color="fg.muted" ref={ref} {...props}>
      {children}
    </Text>
  )
})

interface SectionBodyProps extends StackProps {}

export const SectionBody = forwardRef<HTMLDivElement, SectionBodyProps>(
  function SectionBody({ children, ...props }, ref) {
    return (
      <Stack gap="0" ref={ref} {...props}>
        {children}
      </Stack>
    )
  }
)

interface SectionActionsProps extends StackProps {}

export const SectionActions = forwardRef<HTMLDivElement, SectionActionsProps>(
  function SectionActions({ children, ...props }, ref) {
    return (
      <HStack
        position="fixed"
        bottom="0"
        left={{ base: '0', lg: 'max-sidebar-width' }}
        right="0"
        justifyContent="flex-end"
        height="20"
        backgroundColor="white"
        borderTopWidth="thin"
        borderTopColor="zinc.200"
        paddingX="6"
        ref={ref}
        {...props}
      >
        {children}
      </HStack>
    )
  }
)
