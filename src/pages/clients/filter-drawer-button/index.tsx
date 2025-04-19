import {
  Circle,
  createListCollection,
  Float,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useReducer, useState } from 'react'
import { LuInfo } from 'react-icons/lu'
import { RxMixerHorizontal } from 'react-icons/rx'

import { DateSingle } from '@/components/date-single'
import { TextInput } from '@/components/text-input'
import { Button } from '@/components/ui/button'
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Field } from '@/components/ui/field'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'
import { useModules } from '@/hooks/use-modules'
import { usePlans } from '@/hooks/use-plans'
import { filterReducer, initialFilterState } from '@/reducers/filter/reducer'

import { billingTypeList, blockedList, blockedTypeList } from '../collections'

type SearchParams = Record<string, string | number>

interface FilterDrawerButtonProps {
  onSearchParamsChange: (params: SearchParams) => void
  onClearParams: () => void
}

export function FilterDrawerButton({
  onSearchParamsChange,
  onClearParams,
}: FilterDrawerButtonProps) {
  const [searchParamsSize, setSearchParamsSize] = useState(0)
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)

  const { plans, isPlansLoading } = usePlans()
  const { modules, isModulesLoading } = useModules()

  const formattedPlanList = createListCollection({
    items: plans
      ? plans?.map((plan) => ({
          label: plan.description,
          value: plan.id,
        }))
      : [],
  })

  const formattedModuleList = createListCollection({
    items: modules
      ? modules?.map((module) => ({
          label: module.description,
          value: module.id,
        }))
      : [],
  })

  const formattedDate = (date?: Date) =>
    date ? dayjs(date).format('YYYY/MM/DD') : ''

  function handleSearchParamsChange() {
    const urlSearchParams = new URLSearchParams()
    const newSearchParams = {
      dueDay: state.dueDay,
      blocked: state.blocked,
      blockedType: state.blockedType,
      billingStatus: state.billingStatus,
      planIds: state.planIds.length > 0 ? state.planIds.join(',') : '',
      moduleIds: state.moduleIds.length > 0 ? state.moduleIds.join(',') : '',
      creationStartDate: formattedDate(state.creationStartDate),
      creationEndDate: formattedDate(state.creationEndDate),
      dueDateStart: formattedDate(state.dueDateStart),
      dueDateEnd: formattedDate(state.dueDateEnd),
      blockStartDate: formattedDate(state.blockStartDate),
      blockEndDate: formattedDate(state.blockEndDate),
    }

    Object.entries(newSearchParams).forEach(([key, value]) => {
      if (value.trim() !== '') {
        urlSearchParams.set(key, value.toString())
        onSearchParamsChange({ [key]: value.toString() })
      }
    })

    setSearchParamsSize(urlSearchParams.size)
    setOpenFilterDrawer(false)
  }

  function handleClearParams() {
    onClearParams()
    dispatch({ type: 'CLEAR_PARAMS' })
    setSearchParamsSize(0)
  }

  const placeholderCurrentDate = dayjs(new Date()).format('DD/MM/YYYY')

  return (
    <DrawerRoot
      lazyMount
      open={openFilterDrawer}
      onOpenChange={({ open }) => setOpenFilterDrawer(open)}
      size="sm"
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline">
          {searchParamsSize > 0 && (
            <Float>
              <Circle size="5" backgroundColor="red" color="white">
                <Text fontSize="xs" fontWeight="bolder">
                  {searchParamsSize}
                </Text>
              </Circle>
            </Float>
          )}
          <RxMixerHorizontal />
          Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <VStack gap="4">
            <Field
              label="Data do cadastro"
              optionalText={
                <Tooltip content="Data inicial e final do cadastro" showArrow>
                  <LuInfo />
                </Tooltip>
              }
            >
              <HStack gap="3">
                <DateSingle
                  selected={state.creationStartDate}
                  onSelect={(value) =>
                    dispatch({
                      type: 'SET_CREATION_START_DATE',
                      payload: value,
                    })
                  }
                  placeholder={placeholderCurrentDate}
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_CREATION_START_DATE',
                      payload: undefined,
                    })
                  }
                  clearable={state.creationStartDate !== undefined}
                  fullWidth
                />
                <DateSingle
                  selected={state.creationEndDate}
                  onSelect={(value) =>
                    dispatch({ type: 'SET_CREATION_END_DATE', payload: value })
                  }
                  placeholder={placeholderCurrentDate}
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_CREATION_END_DATE',
                      payload: undefined,
                    })
                  }
                  clearable={state.creationEndDate !== undefined}
                  fullWidth
                />
              </HStack>
            </Field>

            <Field
              label="Data de vencimento"
              optionalText={
                <Tooltip content="Data inicial e final de vencimento" showArrow>
                  <LuInfo />
                </Tooltip>
              }
            >
              <HStack gap="3">
                <DateSingle
                  selected={state.dueDateStart}
                  onSelect={(value) =>
                    dispatch({
                      type: 'SET_DUE_DATE_START',
                      payload: value,
                    })
                  }
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_DUE_DATE_START',
                      payload: undefined,
                    })
                  }
                  clearable={state.dueDateStart !== undefined}
                  placeholder={placeholderCurrentDate}
                  fullWidth
                />
                <DateSingle
                  selected={state.dueDateEnd}
                  onSelect={(value) =>
                    dispatch({
                      type: 'SET_DUE_DATE_END',
                      payload: value,
                    })
                  }
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_DUE_DATE_END',
                      payload: undefined,
                    })
                  }
                  clearable={state.dueDateEnd !== undefined}
                  placeholder={placeholderCurrentDate}
                  fullWidth
                />
              </HStack>
            </Field>

            <Field
              label="Data do bloqueio"
              optionalText={
                <Tooltip content="Data inicial e final do bloqueio" showArrow>
                  <LuInfo />
                </Tooltip>
              }
            >
              <HStack gap="3">
                <DateSingle
                  selected={state.blockStartDate}
                  onSelect={(value) =>
                    dispatch({ type: 'SET_BLOCK_START_DATE', payload: value })
                  }
                  placeholder={placeholderCurrentDate}
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_BLOCK_START_DATE',
                      payload: undefined,
                    })
                  }
                  clearable={state.blockStartDate !== undefined}
                  fullWidth
                />
                <DateSingle
                  selected={state.blockEndDate}
                  onSelect={(value) =>
                    dispatch({ type: 'SET_BLOCK_END_DATE', payload: value })
                  }
                  placeholder={placeholderCurrentDate}
                  onClearValue={() =>
                    dispatch({
                      type: 'SET_BLOCK_END_DATE',
                      payload: undefined,
                    })
                  }
                  clearable={state.blockEndDate !== undefined}
                  fullWidth
                />
              </HStack>
            </Field>

            <Field
              label="Dia de vencimento mensalidade"
              optionalText={
                <Tooltip content="1 ao 30" showArrow>
                  <LuInfo />
                </Tooltip>
              }
            >
              <TextInput
                value={state.dueDay}
                onChange={(event) =>
                  dispatch({ type: 'SET_DUE_DAY', payload: event.target.value })
                }
                maxLength={2}
                placeholder="1"
              />
            </Field>

            <Field label="Status do bloqueio">
              <SelectRoot
                value={[state.blocked]}
                onValueChange={({ value }) =>
                  dispatch({ type: 'SET_BLOCKED', payload: value[0] })
                }
                collection={blockedList}
              >
                <SelectTrigger>
                  <SelectValueText />
                </SelectTrigger>
                <SelectContent portalled={false}>
                  {blockedList.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            {state.blocked === 'true' && (
              <Field label="Tipo do bloqueio">
                <SelectRoot
                  value={[state.blockedType]}
                  onValueChange={({ value }) =>
                    dispatch({ type: 'SET_BLOCKED_TYPE', payload: value[0] })
                  }
                  collection={blockedTypeList}
                >
                  <SelectTrigger>
                    <SelectValueText />
                  </SelectTrigger>
                  <SelectContent portalled={false}>
                    {blockedTypeList.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            )}

            <Field label="Status da cobrança">
              <SelectRoot
                value={[state.billingStatus]}
                onValueChange={({ value }) =>
                  dispatch({ type: 'SET_BILLING_STATUS', payload: value[0] })
                }
                collection={billingTypeList}
              >
                <SelectTrigger>
                  <SelectValueText />
                </SelectTrigger>
                <SelectContent portalled={false}>
                  {billingTypeList.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field label="Planos">
              <SelectRoot
                multiple
                value={state.planIds}
                onValueChange={({ value }) =>
                  dispatch({ type: 'SET_PLAN_IDS', payload: value })
                }
                collection={formattedPlanList}
                disabled={isPlansLoading}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Selecione um ou mais plano(s)" />
                </SelectTrigger>
                <SelectContent portalled={false}>
                  {formattedPlanList.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field label="Módulos">
              <SelectRoot
                multiple
                value={state.moduleIds}
                onValueChange={({ value }) =>
                  dispatch({ type: 'SET_MODULE_IDS', payload: value })
                }
                collection={formattedModuleList}
                disabled={isModulesLoading}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Selecione um ou mais módulo(s)" />
                </SelectTrigger>
                <SelectContent portalled={false}>
                  {formattedModuleList.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <SimpleGrid width="full" columns={12} gap="4">
            <GridItem colSpan={6}>
              <Button
                width="full"
                variant="outline"
                onClick={handleClearParams}
              >
                Limpar
              </Button>
            </GridItem>
            <GridItem colSpan={6}>
              <Button width="full" onClick={handleSearchParamsChange}>
                Aplicar
              </Button>
            </GridItem>
          </SimpleGrid>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}
