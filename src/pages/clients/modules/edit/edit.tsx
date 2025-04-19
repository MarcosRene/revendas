import {
  Flex,
  FormatNumber,
  Link as ChakraLink,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { BsPlayBtn } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router'

import {
  SectionActions,
  SectionBody,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from '@/components/section'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { toaster } from '@/components/ui/toaster'
import { type ChangeDetails, type ClientFormStateProps } from '@/dtos/types'
import { useClientForm } from '@/hooks/use-client-form'
import { useModules } from '@/hooks/use-modules'
import { getClientById } from '@/http/clients/get-client-by-id'
import { updateSubscription } from '@/http/clients/update-subscription'
import { errorHandler } from '@/utils/error-handler'

import { AccordionPlan } from '../accordion-plan'
import { DialogQuantity } from '../dialog-quantity'
import { ModulesSkeleton } from '../skeleton'
import {
  type ModuleItemType,
  type QuantitiesType,
  type QuantityValue,
} from '../types'

let errorMessage = ''

type ModulesParams = {
  id?: string
}

export function EditModules() {
  const { id: clientId } = useParams<ModulesParams>()
  const {
    formState: { plan },
  } = useClientForm<ClientFormStateProps>()
  const navigate = useNavigate()
  const [planValue, setPlanValue] = useState(0)
  const [selectedModuleIds, setSelectedModuleIds] = useState<number[]>([])
  const [quantities, setQuantities] = useState<QuantitiesType>({})

  const { modules, isModulesLoading } = useModules()

  const { data: client, isLoading: isClientLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClientById({ clientId }),
    enabled: Boolean(clientId),
  })

  const planId = plan?.id.toString()
  const selectedModules = selectedModuleIds.map((id) => ({
    id,
    quantity: quantities[id],
  }))

  const { mutateAsync: updateSubscriptionFn, isPending: isUpdating } =
    useMutation({
      mutationFn: () =>
        updateSubscription({
          clientId,
          planId,
          modules: selectedModules,
        }),
      onSuccess: ({ id }) => {
        toaster.success({
          title: 'Assinatura atualizada com sucesso!',
        })

        navigate(`/clients/${id}/details`)
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  function onPlanValue(value: number) {
    setPlanValue(value)
  }

  function handleCheckedChange(changes: ChangeDetails, moduleId: number) {
    setSelectedModuleIds((prevSelectedModulesIds) =>
      changes.checked
        ? [...prevSelectedModulesIds, moduleId]
        : prevSelectedModulesIds.filter((id) => id !== moduleId)
    )
  }

  function handleQuantitiesChange(
    event: ChangeEvent<HTMLInputElement>,
    moduleId: number
  ) {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [moduleId]: Number(event.target.value),
    }))
  }

  function handleUpdateSubscription(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    updateSubscriptionFn()
  }

  function error(quantityValues: QuantityValue[], value: number) {
    const isError =
      quantityValues.length > 0 &&
      !quantityValues.some((quantity) => {
        return (
          value >= quantity.initialQuantity && value <= quantity.finalQuantity
        )
      })

    return isError
      ? 'Para esse módulo, a quantidade máxima permitida é 100.'
      : ''
  }

  const { total, moduleItem } = useMemo(() => {
    let total = 0
    const moduleItem: ModuleItemType = {}

    selectedModuleIds.forEach((moduleId) => {
      const currentModule = modules?.find((module) => module.id === moduleId)
      if (currentModule) {
        let currentUnitPrice = currentModule?.price || 0
        let currentTotalUnitPrice = currentUnitPrice

        Object.entries(quantities).forEach(([currentModuleId, value]) => {
          if (currentModule?.id === Number(currentModuleId) && value) {
            const finalQuantity = Math.max(
              value - currentModule.quantityFree,
              0
            )

            if (finalQuantity === 0) {
              moduleItem[moduleId] = {
                unitPrice: 0,
                totalUnitPrice: 0,
              }
              return
            }

            errorMessage = error(currentModule.quantityValues, finalQuantity)

            const unitPrice =
              currentModule?.quantityValues.length > 0 && finalQuantity > 0
                ? currentModule?.quantityValues?.find(
                    (quantity) =>
                      finalQuantity >= quantity.initialQuantity &&
                      finalQuantity <= quantity.finalQuantity
                  )?.unitPrice
                : currentModule.price

            if (unitPrice) {
              currentUnitPrice = unitPrice
              currentTotalUnitPrice = unitPrice * finalQuantity
            }
          }
        })

        if (!moduleItem[moduleId]) {
          moduleItem[moduleId] = {
            unitPrice: currentUnitPrice,
            totalUnitPrice: currentTotalUnitPrice,
          }
        }

        total = total + currentTotalUnitPrice
      }
    })

    return { total, moduleItem }
  }, [modules, selectedModuleIds, quantities])

  const roundedSubscriptionValue = Math.round((total + planValue) * 10) / 10
  const totalSubscriptionValue =
    client?.subscriptionValue === roundedSubscriptionValue

  useEffect(() => {
    if (modules && modules.length > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities }

        modules.forEach((module) => {
          if (newQuantities[module.id] === undefined) {
            newQuantities[module.id] = 1
          }
        })

        return newQuantities
      })
    }
  }, [modules])

  useEffect(() => {
    if (client?.modules && client.modules?.length > 0 && !isClientLoading) {
      setSelectedModuleIds(client.modules.map((module) => module.id))

      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities }

        client.modules.forEach((module) => {
          if (newQuantities[module.id] === undefined) {
            newQuantities[module.id] = module.totalQuantity
          }
        })

        return newQuantities
      })
    }
  }, [client?.modules, isClientLoading])

  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>Módulos</SectionTitle>
        <SectionDescription>
          Selecione os módulos que melhor atendem às necessidades do seu
          cliente.
        </SectionDescription>
      </SectionHeader>

      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link to="/clients">Clientes</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Editar</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <SectionBody>
        <Stack display="flex" alignItems="center" width="full" spaceY="6">
          <AccordionPlan onPlanValue={onPlanValue} />

          <List.Root width="full">
            {isModulesLoading && <ModulesSkeleton />}

            {!isModulesLoading &&
              modules?.map((module) => (
                <List.Item
                  key={module.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="baseline"
                  spaceY="4"
                >
                  <Flex flex="1" gap="2">
                    <Checkbox
                      top="1"
                      aria-label="Select row"
                      checked={selectedModuleIds.includes(module.id)}
                      onCheckedChange={(changes) =>
                        handleCheckedChange(changes, module.id)
                      }
                      size="md"
                    >
                      <Text fontSize="sm" fontWeight="light">
                        {module.description}
                      </Text>
                    </Checkbox>

                    {module.videoUrl && (
                      <ChakraLink
                        marginTop="2"
                        colorPalette="red"
                        title="Vídeo demostrativo"
                        href={module.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsPlayBtn size="1.25rem" />
                      </ChakraLink>
                    )}
                  </Flex>

                  {module.quantityAllowed && (
                    <DialogQuantity
                      module={module}
                      moduleItem={moduleItem}
                      selectedModuleIds={selectedModuleIds}
                      onQuantityChange={handleQuantitiesChange}
                      quantities={quantities}
                      errorMessage={errorMessage}
                    />
                  )}

                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    textDecoration="underline"
                    width="full"
                    maxWidth="24"
                    textAlign="end"
                  >
                    <FormatNumber
                      value={
                        moduleItem[module.id]?.totalUnitPrice >= 0
                          ? moduleItem[module.id]?.totalUnitPrice
                          : module.price
                      }
                      style="currency"
                      currency="BRL"
                    />
                  </Text>
                </List.Item>
              ))}
          </List.Root>

          <Separator width="full" marginTop="6" borderColor="zinc.200" />

          <Flex width="full" justifyContent="space-between">
            <Skeleton loading={isModulesLoading}>
              <Text>Valor total dos módulos</Text>
            </Skeleton>
            <Skeleton loading={isModulesLoading}>
              <Text fontSize="md" fontWeight="500" textDecoration="underline">
                <FormatNumber value={total} style="currency" currency="BRL" />
              </Text>
            </Skeleton>
          </Flex>

          <Separator width="full" marginTop="6" borderColor="zinc.200" />

          <Flex width="full" justifyContent="space-between">
            <Skeleton loading={isModulesLoading}>
              <Text>Valor total da assinatura</Text>
            </Skeleton>
            <Skeleton loading={isModulesLoading}>
              <Text fontSize="md" fontWeight="500" textDecoration="underline">
                <FormatNumber
                  value={total + planValue}
                  style="currency"
                  currency="BRL"
                />
              </Text>
            </Skeleton>
          </Flex>
        </Stack>
      </SectionBody>
      <SectionActions justifyContent="space-between">
        <Skeleton loading={isModulesLoading}>
          <Button variant="outline" asChild>
            <Link to={`/clients/${clientId}/plans/${planId}`}>Voltar</Link>
          </Button>
        </Skeleton>
        <Skeleton loading={isModulesLoading}>
          <Button
            onClick={handleUpdateSubscription}
            loading={isUpdating}
            disabled={totalSubscriptionValue}
          >
            Continuar
          </Button>
        </Skeleton>
      </SectionActions>
    </SectionRoot>
  )
}
