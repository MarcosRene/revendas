import {
  Card,
  Flex,
  FormatNumber,
  Icon,
  Link as ChakraLink,
  List,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsPlayBtn } from 'react-icons/bs'
import { LuInfo } from 'react-icons/lu'
import { MdCheckCircle } from 'react-icons/md'
import { Link } from 'react-router'

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
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleTip } from '@/components/ui/toggle-tip'
import { type ClientFormStateProps, type Plan } from '@/dtos/types'
import { useClientForm } from '@/hooks/use-client-form'
import { usePlans } from '@/hooks/use-plans'

import { PlanSkeleton } from '../skeleton'

export function NewPlans() {
  const { setFormState, formState } = useClientForm<ClientFormStateProps>()
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const { plans, isPlansLoading } = usePlans()

  function onPlanSelected(plan: Plan) {
    setFormState({ plan })
    setSelectedPlan((prevCurrentPlan) =>
      prevCurrentPlan?.id === plan.id ? null : plan
    )
  }

  useEffect(() => {
    if (formState.plan) {
      setSelectedPlan(formState.plan)
    }
  }, [formState.plan])

  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>Planos</SectionTitle>
        <SectionDescription>
          Antes de prosseguir com o cadastro de um novo cliente, é necessário
          selecionar o plano desejado.
        </SectionDescription>
      </SectionHeader>

      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link to="/clients">Clientes</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Novo</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <SectionBody>
        {isPlansLoading && <PlanSkeleton />}

        <SimpleGrid minChildWidth="17.5rem" gap="4">
          {plans?.map((plan) => {
            const isSelectedPlan = selectedPlan?.id === plan.id

            const planColor = `rgba(${plan.color.red}, ${plan.color.green}, ${plan.color.blue}, 0.5)`

            return (
              <Card.Root
                key={plan.id}
                position="relative"
                outlineWidth="thin"
                outlineStyle="solid"
                outlineColor={isSelectedPlan ? planColor : 'transparent'}
                borderColor={isSelectedPlan ? planColor : 'inherit'}
                borderBottomColor={planColor}
                borderBottomWidth="thick"
                transitionProperty={['all']}
                transitionDuration="fast"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  cursor: 'pointer',
                  borderColor: planColor,
                  outlineColor: planColor,
                }}
                onClick={() => onPlanSelected(plan)}
              >
                {plan.videoUrl && (
                  <ChakraLink
                    title="Vídeo demostrativo"
                    href={plan.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    position="absolute"
                    top="3"
                    right="4"
                    outline="none"
                  >
                    <BsPlayBtn size="1.125rem" />
                  </ChakraLink>
                )}
                <Card.Header>
                  <Card.Title
                    fontSize="md"
                    textAlign="center"
                    lineHeight="short"
                    height="10"
                    lineClamp={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {plan.description}
                  </Card.Title>
                  <Card.Description
                    marginTop="2"
                    textAlign="center"
                    lineClamp={3}
                    height="16"
                  >
                    {plan.details}
                  </Card.Description>
                  <Flex justifyContent="center" alignItems="center">
                    <Text
                      fontSize="xl"
                      fontWeight="bolder"
                      textDecorationLine="underline"
                      textDecorationStyle="double"
                      textDecorationColor={planColor}
                    >
                      <FormatNumber
                        value={plan.price}
                        style="currency"
                        currency="BRL"
                        currencyDisplay="symbol"
                      />
                    </Text>
                  </Flex>
                </Card.Header>
                <Card.Body>
                  <ToggleTip
                    content={
                      <List.Root
                        margin="6"
                        spaceY="4"
                        maxHeight="80"
                        overflowY="auto"
                      >
                        {plan.features.map((feat) => (
                          <List.Item
                            key={feat.feature}
                            display="flex"
                            alignItems="center"
                            gap="3"
                          >
                            <Icon fontSize="2xl" color="green.600">
                              <span>
                                <MdCheckCircle />
                              </span>
                            </Icon>
                            <Text fontSize="sm" color="fg.muted">
                              {feat.feature}
                            </Text>
                          </List.Item>
                        ))}
                      </List.Root>
                    }
                    showArrow
                    size="lg"
                  >
                    <Button variant="plain" size="xs" color="fg.muted">
                      Clique e saiba mais
                      <LuInfo />
                    </Button>
                  </ToggleTip>
                </Card.Body>
                <Card.Footer justifyContent="center">
                  <Button size="xs">
                    <Text
                      color={isSelectedPlan ? 'green.200' : 'inherit'}
                      display="flex"
                      alignItems="center"
                    >
                      {isSelectedPlan ? 'Selecionado' : 'Selecione'}
                      {isSelectedPlan && (
                        <Icon marginLeft="2" fontSize="lg" color="green.200">
                          <span>
                            <MdCheckCircle />
                          </span>
                        </Icon>
                      )}
                    </Text>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </SimpleGrid>
      </SectionBody>
      <SectionActions justifyContent="space-between">
        <Skeleton loading={isPlansLoading}>
          <Button variant="outline" asChild>
            <Link to="/clients">Cancelar</Link>
          </Button>
        </Skeleton>
        <Skeleton loading={isPlansLoading}>
          <Button disabled={!selectedPlan?.id} asChild>
            <Link to="/clients/modules">Continuar</Link>
          </Button>
        </Skeleton>
      </SectionActions>
    </SectionRoot>
  )
}
