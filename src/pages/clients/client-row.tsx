import {
  Flex,
  FormatNumber,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { memo } from 'react'
import { Link } from 'react-router'

import { InfoText } from '@/components/info-text'
import { PixPaymentButton } from '@/components/pix-payment-button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tag } from '@/components/ui/tag'
import { type ChangeDetails } from '@/dtos/types'
import { formatDate } from '@/utils/dayjs'

import { type ClientRowProps } from './types'

const ClientRowRoot = ({ client, selection, onSelection }: ClientRowProps) => {
  const isLassThen1200px = useBreakpointValue({
    base: true,
    md: false,
  })

  function handleCheckedChange(changes: ChangeDetails) {
    onSelection(changes, client)
  }

  const billingIds = selection.map((id) => id?.toString())
  const statusBlockedType: Record<string, string> = {
    resale: 'Bloq. revenda',
    payment: 'Bloq. falta de pagamento',
  }

  const clientBlockStatus =
    statusBlockedType[client?.blockDetails?.blockType || 'resale']

  return (
    <Flex
      paddingX="4"
      borderRadius="l3"
      borderWidth="thin"
      borderColor="zinc.200"
      borderStyle="solid"
      alignItems="center"
      justifyContent="space-between"
      borderLeftStyle="solid"
      borderLeftWidth="thick"
      borderLeftColor={
        client.billing?.status === 'overdue' ? 'red.200' : 'orange.200'
      }
    >
      <Checkbox
        aria-label="Select row"
        checked={selection.includes(client?.billing?.id || 0)}
        onCheckedChange={handleCheckedChange}
      />
      <SimpleGrid
        paddingX="4"
        paddingY="3"
        width="full"
        columns={{ base: 1, md: 12 }}
        alignItems="center"
        gap={{ base: 3, md: 6 }}
        asChild
      >
        <Link to={`/clients/${client.id}/details`}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <VStack alignItems="flex-start" gap="1">
              <Text fontSize="sm">{client.plan?.description}</Text>

              {client?.blocked ? (
                <Tag colorPalette="red" size="md" title={clientBlockStatus}>
                  {clientBlockStatus}
                </Tag>
              ) : (
                <Tag colorPalette="purple" size="md" title="Liberado">
                  Liberado
                </Tag>
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 5 }}>
            <Stack gap="normal">
              <InfoText label="Razão Social: " value={client.name} />
              <InfoText label="Nome Fantasia: " value={client.description} />
              <InfoText
                label="Validade da licença: "
                value={
                  client.licenseExpirationDate
                    ? formatDate(client.licenseExpirationDate)
                    : '-'
                }
              />
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 5 }}>
            <Stack gap="normal">
              <InfoText
                infoValueProps={{
                  color:
                    client.billing?.status === 'overdue'
                      ? 'red.700'
                      : 'initial',
                }}
                label="Valor: "
                value={
                  <FormatNumber
                    value={client.billing?.value || 0}
                    style="currency"
                    currency="BRL"
                  />
                }
              />
              <InfoText
                infoValueProps={{
                  color:
                    client.billing?.status === 'overdue'
                      ? 'red.700'
                      : 'initial',
                }}
                label="Valor atual: "
                value={
                  <FormatNumber
                    value={client.billing?.currentValue || 0}
                    style="currency"
                    currency="BRL"
                  />
                }
              />
              <InfoText
                infoValueProps={{
                  color:
                    client.billing?.status === 'overdue'
                      ? 'red.700'
                      : 'initial',
                }}
                label="Data de vencimento: "
                value={
                  client.billing?.dueDate
                    ? formatDate(client.billing?.dueDate)
                    : '-'
                }
              />
            </Stack>
          </GridItem>
          {isLassThen1200px && (
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <PixPaymentButton
                billingIds={billingIds}
                billingId={client.billing?.id.toString()}
              />
            </GridItem>
          )}
        </Link>
      </SimpleGrid>
      {!isLassThen1200px && (
        <PixPaymentButton
          billingIds={billingIds}
          billingId={client.billing?.id.toString()}
        />
      )}
    </Flex>
  )
}

export const ClientRow = memo(ClientRowRoot)
