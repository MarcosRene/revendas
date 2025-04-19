import { HStack, type StackProps, Text, type TextProps } from '@chakra-ui/react'

interface InfoValueProps extends StackProps {}

export function InfoValue({ children, ...props }: InfoValueProps) {
  return (
    <HStack display="inline" gap="0" fontSize="sm" {...props}>
      {children}
    </HStack>
  )
}

interface InfoLabelProps extends TextProps {
  label: string
}

export function InfoLabel({ label, ...props }: InfoLabelProps) {
  return (
    <Text as="span" display="inline" fontWeight="semibold" {...props}>
      {label}
    </Text>
  )
}

interface InfoRootProps {
  label: string
  value: string | number | React.ReactNode
  infoValueProps?: StackProps
  infoLabelProps?: TextProps
}

export function InfoText({
  label,
  value,
  infoLabelProps,
  infoValueProps,
}: InfoRootProps) {
  const title = typeof value === 'string' ? value.toString() : ''

  return (
    <InfoValue title={title} truncate {...infoValueProps}>
      <InfoLabel label={label} {...infoLabelProps} />
      {value}
    </InfoValue>
  )
}
