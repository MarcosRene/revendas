import {
  Box,
  Card,
  createListCollection,
  Flex,
  FormatNumber,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

import { InfoText } from '@/components/info-text'
import { PixPaymentButton } from '@/components/pix-payment-button'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from '@/components/ui/action-bar'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { type ChangeDetails } from '@/dtos/types'
import { getBillings } from '@/http/clients/get-billings'

import { type DetailsParams } from '../types'
import { BillingRow } from './billing-row'
import { GenerateBillingButton } from './generate-billing-button'
import { BillingsSkeleton } from './skeleton'
import { type Billing } from './types'
import { Unsubscribe } from './unsubscribe'

const statusList = createListCollection({
  items: [
    { label: 'Selecione um status', value: '' },
    { label: 'PENDENTE', value: 'PENDENTE' },
    { label: 'ATRASADA', value: 'ATRASADA' },
    { label: 'PAGA', value: 'PAGA' },
  ],
})

export function Billing() {
  const { id: clientId } = useParams<DetailsParams>()
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get('status') || ''
  )
  const [selectedBillingIds, setSelectedBillingIds] = useState<number[]>([])

  const startDateDue = dayjs()
    .subtract(12, 'months')
    .startOf('month')
    .format('YYYY-MM-DD')

  const { data: billings, isLoading: isBillingsLoading } = useQuery({
    queryKey: ['billings', clientId, selectedStatus],
    queryFn: () =>
      getBillings({
        clientId,
        startDateDue,
        status: selectedStatus,
      }),
  })

  function handleCheckedChange({ checked }: ChangeDetails) {
    if (!billings) return

    const selectableIds = checked
      ? billings.filter((item) => item.status !== 'paid').map((item) => item.id)
      : []

    setSelectedBillingIds(selectableIds)
  }

  function handleSelection(changes: ChangeDetails, billing: Billing) {
    setSelectedBillingIds((prevSelectedBillingIds) =>
      changes.checked
        ? [...prevSelectedBillingIds, billing.id]
        : selectedBillingIds.filter((id) => id !== billing.id)
    )
  }

  function handleStatusChange(status: string) {
    setSearchParams((state) => {
      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      return state
    })

    setSelectedStatus(status)
  }

  const hasSelectedBillingIds = selectedBillingIds.length > 0
  const hasUnpaidSelectedBillingIdss =
    selectedBillingIds.length ===
    billings?.filter((item) => item.status !== 'paid').length
  const indeterminate = hasSelectedBillingIds
    ? hasUnpaidSelectedBillingIdss
      ? true
      : 'indeterminate'
    : false

  const hasEmptyBillingList = billings?.length === 0 && !isBillingsLoading
  const billingsIds = selectedBillingIds.map((id) => id?.toString())

  const { totalValue, totalCurrentValue } = useMemo(() => {
    const totals = billings?.reduce(
      (
        acc: { totalValue: number; totalCurrentValue: number },
        curr: Billing
      ) => {
        if (selectedBillingIds.includes(curr.id) && curr.status !== 'paid') {
          return {
            totalValue: acc.totalValue + curr.value,
            totalCurrentValue: acc.totalCurrentValue + curr.currentValue,
          }
        }

        return acc
      },
      { totalValue: 0, totalCurrentValue: 0 }
    )

    return {
      totalValue: totals?.totalValue || 0,
      totalCurrentValue: totals?.totalCurrentValue || 0,
    }
  }, [billings, selectedBillingIds])

  return (
    <Card.Root borderColor="zinc.200">
      <Card.Header>
        <Skeleton maxWidth="fit-content" loading={isBillingsLoading}>
          <Card.Title>Cobranças</Card.Title>
        </Skeleton>
      </Card.Header>

      <Card.Body spaceY="4">
        <Flex
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          justifyContent="flex-end"
          alignItems="flex-end"
          gap="2"
        >
          <SelectRoot
            value={[selectedStatus]}
            onValueChange={({ value }) => handleStatusChange(value[0])}
            collection={statusList}
            maxWidth="xs"
            size="md"
          >
            <Skeleton loading={isBillingsLoading}>
              <SelectLabel>Filtrar cobranças por status</SelectLabel>
            </Skeleton>
            <Skeleton loading={isBillingsLoading}>
              <SelectTrigger>
                <SelectValueText placeholder="Selecione um status" />
              </SelectTrigger>
            </Skeleton>
            <SelectContent>
              {statusList.items.map((status) => (
                <SelectItem item={status} key={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <Skeleton loading={isBillingsLoading}>
            <GenerateBillingButton clientId={clientId} />
          </Skeleton>
        </Flex>

        <Stack gap="3">
          <Flex
            paddingX="4"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="zinc.100"
            borderRadius="l3"
            borderLeftStyle="solid"
            borderLeftWidth="thick"
            gap="3"
          >
            <Skeleton boxSize="5" loading={isBillingsLoading}>
              <Checkbox
                aria-label="Select all rows"
                checked={indeterminate}
                onCheckedChange={handleCheckedChange}
              />
            </Skeleton>
            <SimpleGrid
              paddingX="4"
              paddingY="3"
              width="full"
              columns={{ base: 2, md: 12 }}
              alignItems="center"
              gap={{ base: 2, md: 6 }}
              asChild
            >
              <HStack>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <Skeleton width="fit-content" loading={isBillingsLoading}>
                    <Text fontSize="sm" fontWeight="medium">
                      Vencimento
                    </Text>
                  </Skeleton>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <Skeleton width="fit-content" loading={isBillingsLoading}>
                    <Text fontSize="sm" fontWeight="medium">
                      Status
                    </Text>
                  </Skeleton>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <Skeleton width="fit-content" loading={isBillingsLoading}>
                    <Text fontSize="sm" fontWeight="medium">
                      Valor
                    </Text>
                  </Skeleton>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                  <Skeleton width="fit-content" loading={isBillingsLoading}>
                    <Text fontSize="sm" fontWeight="medium">
                      Valor atual
                    </Text>
                  </Skeleton>
                </GridItem>
              </HStack>
            </SimpleGrid>
            <Box width="36" display={{ base: 'none', md: 'block' }} />
          </Flex>

          {!isBillingsLoading ? (
            billings?.map((billing) => (
              <BillingRow
                key={billing.id}
                billing={billing}
                selection={selectedBillingIds}
                onSelection={handleSelection}
              />
            ))
          ) : (
            <BillingsSkeleton />
          )}

          {hasEmptyBillingList && (
            <EmptyState
              title="Cobranças indisponíveis"
              description="Nenhuma cobrança foi encontrada. Gere novas cobranças ou revise seus filtros."
            />
          )}
        </Stack>
      </Card.Body>

      <Card.Footer>
        <Skeleton
          maxWidth="fit-content"
          marginLeft="auto"
          loading={isBillingsLoading}
        >
          <Unsubscribe clientId={clientId} />
        </Skeleton>
      </Card.Footer>

      {selectedBillingIds.length > 1 && (
        <ActionBarRoot open={hasSelectedBillingIds}>
          <ActionBarContent flexDirection={{ base: 'column', md: 'row' }}>
            <ActionBarSelectionTrigger fontSize="xs">
              {selectedBillingIds.length} selecionados
            </ActionBarSelectionTrigger>
            <ActionBarSeparator display={{ base: 'none', md: 'block' }} />
            <VStack gap="0">
              <InfoText
                infoValueProps={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                }}
                label="Valor: "
                value={
                  <FormatNumber
                    value={totalValue}
                    style="currency"
                    currency="BRL"
                  />
                }
              />
              <InfoText
                infoValueProps={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                }}
                label="Valor atual: "
                value={
                  <FormatNumber
                    value={totalCurrentValue}
                    style="currency"
                    currency="BRL"
                  />
                }
              />
            </VStack>
            <ActionBarSeparator display={{ base: 'none', md: 'block' }} />
            <PixPaymentButton billingIds={billingsIds} />
          </ActionBarContent>
        </ActionBarRoot>
      )}
    </Card.Root>
  )
}
