import {
  Flex,
  FormatNumber,
  GridItem,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import { PixPaymentButton } from '@/components/pix-payment-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tag } from '@/components/ui/tag'
import { type ChangeDetails } from '@/dtos/types'
import { formatDate } from '@/utils/dayjs'

import { type BillingRowProps } from './types'

export function BillingRow({
  billing,
  selection,
  onSelection,
}: BillingRowProps) {
  const isLassThen1200px = useBreakpointValue({
    base: true,
    md: false,
  })

  const hasPaymentBeenMade = billing.status === 'paid'
  const billingIds = selection.map((id) => id?.toString())

  const statusType: Record<string, { label: string; color: string }> = {
    paid: {
      label: 'Paga',
      color: 'purple',
    },
    pending: {
      label: 'Pendente',
      color: 'orange',
    },
    overdue: {
      label: 'Atrasada',
      color: 'red',
    },
  }

  function handleCheckedChange(changes: ChangeDetails) {
    if (hasPaymentBeenMade) return

    onSelection(changes, billing)
  }

  return (
    <Flex
      paddingX="4"
      paddingY="2"
      borderRadius="l3"
      borderWidth="thin"
      borderColor="zinc.200"
      borderStyle="solid"
      alignItems="center"
      justifyContent="space-between"
      borderLeftStyle="solid"
      borderLeftWidth="thick"
    >
      <Checkbox
        aria-label="Select row"
        checked={selection.includes(billing.id) && !hasPaymentBeenMade}
        onCheckedChange={handleCheckedChange}
        disabled={hasPaymentBeenMade}
        cursor={hasPaymentBeenMade ? 'not-allowed' : 'normal'}
      />
      <SimpleGrid
        paddingX="4"
        paddingY="3"
        width="full"
        columns={{ base: 2, md: 12 }}
        alignItems="center"
        gap={{ base: 3, md: 6 }}
      >
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Text fontSize="sm">{formatDate(billing.dueDate)}</Text>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Tag colorPalette={statusType[billing.status]?.color}>
            {statusType[billing.status]?.label}
          </Tag>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Text fontSize="sm">
            <FormatNumber
              value={billing.value}
              style="currency"
              currency="BRL"
            />
          </Text>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Text fontSize="sm">
            <FormatNumber
              value={billing.currentValue}
              style="currency"
              currency="BRL"
            />
          </Text>
        </GridItem>
        {isLassThen1200px && (
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <PixPaymentButton
              billingIds={billingIds}
              billingId={billing.id.toString()}
              disabled={hasPaymentBeenMade}
            />
          </GridItem>
        )}
      </SimpleGrid>
      {!isLassThen1200px && (
        <PixPaymentButton
          billingIds={billingIds}
          billingId={billing.id.toString()}
          disabled={hasPaymentBeenMade}
        />
      )}
    </Flex>
  )
}
