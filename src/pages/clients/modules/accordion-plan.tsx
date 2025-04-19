import {
  FormatNumber,
  HStack,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FiVideo } from 'react-icons/fi'

import { InfoText } from '@/components/info-text'
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'
import { type Plan } from '@/dtos/types'
import { useClientForm } from '@/hooks/use-client-form'
import { getPlanById } from '@/http/clients/get-plan-by-id'

interface AccordionPlanProps {
  onPlanValue: (value: number) => void
}

interface PlanFormState {
  plan: Plan | null
}

export function AccordionPlan({ onPlanValue }: AccordionPlanProps) {
  const { formState } = useClientForm<PlanFormState>()
  const currentPlanId = formState?.plan?.id.toString()

  const { data: plan, isPending: isPlanLoading } = useQuery({
    queryKey: ['plan-by-id'],
    queryFn: () => getPlanById({ planId: currentPlanId }),
  })

  const planColor = `rgba(${plan?.color.red}, ${plan?.color.green}, ${plan?.color.blue}, 0.5)`

  useEffect(() => {
    onPlanValue(plan?.price || 0)
  }, [plan])

  return (
    <AccordionRoot collapsible>
      <AccordionItem value="" borderBottomColor="zinc.200">
        <AccordionItemTrigger
          fontSize="lg"
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
        >
          <Skeleton loading={isPlanLoading}>
            #Plano: {plan?.description}
            {plan?.videoUrl && (
              <ChakraLink
                href={plan?.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                marginLeft="2"
                height="max-content"
                fontSize="sm"
              >
                <FiVideo />
              </ChakraLink>
            )}
          </Skeleton>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <Stack>
            <InfoText label="Detalhes: " value={plan?.details} />
            <InfoText
              label="Funcionalidades: "
              value={
                <HStack display="inline" spaceX="1">
                  {plan?.features.map((item) => (
                    <Tag
                      key={item.feature}
                      boxShadowColor="none"
                      backgroundColor={planColor}
                      size="sm"
                    >
                      {item.feature}
                    </Tag>
                  ))}
                </HStack>
              }
            />
            <InfoText
              label="Quantidade de máquinas: "
              value={plan?.quantityOfMachines}
            />
            <InfoText
              label="Preço: "
              value={
                <FormatNumber
                  value={plan?.price || 0}
                  style="currency"
                  currency="BRL"
                />
              }
            />
          </Stack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  )
}
