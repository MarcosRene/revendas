import {
  Box,
  Flex,
  FormatNumber,
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { type ChangeEvent, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { Pagintion } from '@/components/pagination'
import { PixPaymentButton } from '@/components/pix-payment-button'
import { SectionDescription, SectionRoot } from '@/components/section'
import { TextInput } from '@/components/text-input'
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from '@/components/ui/action-bar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import { Field } from '@/components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { type ChangeDetails } from '@/dtos/types'
import { useAuth } from '@/hooks/use-auth'
import { useDebounce } from '@/hooks/use-debounce'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { getClients } from '@/http/clients/get-clients'

import { InfoText } from '../../components/info-text'
import { ClientRow } from './client-row'
import { categoryList, limitPerPageList } from './collections'
import { FilterDrawerButton } from './filter-drawer-button'
import { ClientsSkeleton } from './skeleton'
import { type ClientProps } from './types'

export function Clients() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const { setLocalStorage, getLocalStorage } = useLocalStorage()

  const storagedLimitPerPage = getLocalStorage<number>('limit') || 10

  const limit = Number(searchParams.get('limit')) || storagedLimitPerPage
  const page = Number(searchParams.get('page')) || 1
  const creationStartDate = searchParams.get('creationStartDate') || ''
  const creationEndDate = searchParams.get('creationEndDate') || ''
  const dueDateStart = searchParams.get('dueDateStart') || ''
  const dueDateEnd = searchParams.get('dueDateEnd') || ''
  const blockStartDate = searchParams.get('blockStartDate') || ''
  const blockEndDate = searchParams.get('blockEndDate') || ''
  const dueDay = searchParams.get('dueDay') || ''
  const blocked = searchParams.get('blocked') || ''
  const blockedType = searchParams.get('blockedType') || ''
  const billingStatus = searchParams.get('billingStatus') || ''
  const planIds = searchParams.get('planIds') || ''
  const moduleIds = searchParams.get('moduleIds') || ''

  const [selectedBillingIds, setSelectedBillingIds] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState({
    label: 'CPF',
    value: 'cpf',
  })

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce({ value: searchQuery })

  const queryParams = Object.fromEntries(searchParams.entries())
  const { data: clients, isLoading: isClientsLoading } = useQuery({
    queryKey: ['clients', queryParams, debouncedSearch, user],
    queryFn: () =>
      getClients({
        limit,
        page,
        category: {
          field: selectedCategory.value,
          value: searchQuery,
        },
        creationStartDate,
        creationEndDate,
        dueDateStart,
        dueDateEnd,
        blockStartDate,
        blockEndDate,
        dueDay,
        blocked,
        blockedType,
        billingStatus,
        planIds,
        moduleIds,
      }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  })

  function handleURLSearchParamsChange(
    searchParams: Record<string, string | number>
  ) {
    setSearchParams((prevSearchParams) => {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (key === 'limit') {
          setLocalStorage('limit', value.toString())
        }

        if (value) {
          prevSearchParams.set(key, value.toString())
        } else {
          prevSearchParams.delete(key)
        }
      })
      return prevSearchParams
    })
  }

  function handleClearParams() {
    setSearchParams(new URLSearchParams())
  }

  function handleSearchQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value)
  }

  function handleCheckedChange({ checked }: ChangeDetails) {
    if (!clients) return

    const selectableIds = checked
      ? clients?.data.map((item) => item?.billing?.id || 0)
      : []

    setSelectedBillingIds(selectableIds)
  }

  function handleSelection(changes: ChangeDetails, client: ClientProps) {
    setSelectedBillingIds((prevSelectedBillingId) =>
      changes.checked
        ? [...prevSelectedBillingId, client.billing?.id || 0]
        : selectedBillingIds.filter((id) => id !== client.billing?.id)
    )
  }

  function handleCategoryValueChange(value: string) {
    const isSelectedCategory = categoryList.items.find(
      (category) => category.value === value
    )

    if (isSelectedCategory) {
      setSelectedCategory({
        value: isSelectedCategory.value,
        label: isSelectedCategory.label,
      })
    }
  }

  const { totalValue, totalCurrentValue } = useMemo(() => {
    const totals = clients?.data.reduce(
      (acc: { totalValue: number; totalCurrentValue: number }, curr) => {
        if (selectedBillingIds.includes(curr.billing.id || 0)) {
          return {
            totalValue: acc.totalValue + (curr.billing.value || 0),
            totalCurrentValue:
              acc.totalCurrentValue + (curr.billing.currentValue || 0),
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
  }, [clients, selectedBillingIds])

  const hasSelection = selectedBillingIds.length > 0
  const indeterminate =
    hasSelection && selectedBillingIds.length < (clients?.data.length || 0)
      ? 'indeterminate'
      : selectedBillingIds.length > 0

  const hasEmptyClientList = clients?.data.length === 0 && !isClientsLoading
  const hasPagination = !hasEmptyClientList && !isClientsLoading
  const billingsIds = selectedBillingIds.map((id) => id?.toString())

  return (
    <SectionRoot paddingBottom="4">
      <SectionDescription fontSize="md" color="gray.950" as="span">
        Seja bem-vindo ao painel de revendas,{' '}
        <Text display="inline" fontWeight="medium">
          {user?.name}!
        </Text>
      </SectionDescription>
      <HStack
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', lg: 'center' }}
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Clientes
        </Text>

        <Button size="sm" colorPalette="purple" asChild>
          <Link to="/clients/plans">Novo cliente</Link>
        </Button>
      </HStack>
      <Flex
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
        justifyContent={{
          base: 'flex-start',
          md: 'space-between',
        }}
        alignItems="flex-end"
        gap="4"
      >
        <SimpleGrid
          width="full"
          columns={{ base: 1, md: 12, lg: 11 }}
          gap="4"
          alignItems="self-end"
        >
          <GridItem colSpan={{ base: 1, md: 4, lg: 3 }}>
            <Field label="Tipo de busca">
              <Skeleton loading={isClientsLoading} width="full">
                <SelectRoot
                  collection={categoryList}
                  value={[selectedCategory.value]}
                  onValueChange={({ value }) =>
                    handleCategoryValueChange(value[0])
                  }
                >
                  <SelectTrigger>
                    <SelectValueText />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.items.map((category) => (
                      <SelectItem item={category.value} key={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Skeleton>
            </Field>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 4, lg: 3 }}>
            <Field label="Buscar por">
              <Skeleton loading={isClientsLoading} width="full">
                <TextInput
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder={selectedCategory.label}
                />
              </Skeleton>
            </Field>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 4, lg: 3 }}>
            <Field label="Limite por página">
              <Skeleton loading={isClientsLoading} width="full">
                <SelectRoot
                  collection={limitPerPageList}
                  value={[limit.toString()]}
                  onValueChange={({ value }) => {
                    handleURLSearchParamsChange({ limit: value[0] })
                  }}
                >
                  <SelectTrigger>
                    <SelectValueText />
                  </SelectTrigger>
                  <SelectContent>
                    {limitPerPageList.items.map((category) => (
                      <SelectItem item={category.value} key={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Skeleton>
            </Field>
          </GridItem>
        </SimpleGrid>
        <Skeleton loading={isClientsLoading}>
          <FilterDrawerButton
            onSearchParamsChange={handleURLSearchParamsChange}
            onClearParams={handleClearParams}
          />
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
          <Skeleton boxSize="5" loading={isClientsLoading}>
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
            columns={{ base: 1, md: 12 }}
            alignItems="center"
            gap={{ base: 2, md: 6 }}
            asChild
          >
            <HStack>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Skeleton width="fit-content" loading={isClientsLoading}>
                  <Text fontSize="sm" fontWeight="medium">
                    Plano
                  </Text>
                </Skeleton>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Skeleton width="fit-content" loading={isClientsLoading}>
                  <Text fontSize="sm" fontWeight="medium">
                    Cliente
                  </Text>
                </Skeleton>
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 5 }}>
                <Skeleton width="fit-content" loading={isClientsLoading}>
                  <Text fontSize="sm" fontWeight="medium">
                    Cobrança
                  </Text>
                </Skeleton>
              </GridItem>
            </HStack>
          </SimpleGrid>
          <Box width="36" display={{ base: 'none', md: 'block' }} />
        </Flex>

        {!isClientsLoading ? (
          clients?.data.map((client) => (
            <ClientRow
              key={client.id}
              client={client as ClientProps}
              selection={selectedBillingIds}
              onSelection={handleSelection}
            />
          ))
        ) : (
          <ClientsSkeleton />
        )}

        {hasEmptyClientList && (
          <EmptyState
            title="Clientes indisponíveis"
            description="Nenhum cliente foi encontrado. Cadastre novos clientes ou revise seus filtros."
          />
        )}

        {hasPagination && (
          <Pagintion
            totalPages={clients?.totalPages || 0}
            page={clients?.page || 1}
            onPageChange={(pageIndex) =>
              handleURLSearchParamsChange({ page: pageIndex })
            }
          />
        )}
      </Stack>

      {selectedBillingIds.length > 1 && (
        <ActionBarRoot open={hasSelection}>
          <ActionBarContent flexDirection={{ base: 'column', md: 'row' }}>
            <ActionBarSelectionTrigger fontSize="xs">
              {selectedBillingIds.length} selecionados
            </ActionBarSelectionTrigger>
            <ActionBarSeparator display={{ base: 'none', md: 'block' }} />
            <Stack gap="0">
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
            </Stack>
            <ActionBarSeparator display={{ base: 'none', md: 'block' }} />
            <PixPaymentButton billingIds={billingsIds} />
          </ActionBarContent>
        </ActionBarRoot>
      )}
    </SectionRoot>
  )
}
