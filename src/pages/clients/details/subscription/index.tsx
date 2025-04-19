import { Button, Card, FormatNumber, HStack, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router'

import { InfoText } from '@/components/info-text'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'
import { useGetClientDetails } from '@/hooks/use-get-client-details'
import { formatDate, formatDateTime } from '@/utils/dayjs'

import { type DetailsParams } from '../types'
import { BlockCustomer } from './block-customer'
import { UnblockCustomer } from './unblock-customer'

export function Subscription() {
  const { id: clientId } = useParams<DetailsParams>()

  const { details, isClientLoading } = useGetClientDetails({ clientId })

  const tagType = {
    resale: 'Bloq. revenda',
    payment: 'Bloq. falta de pagamento',
  }

  const isBlockedForOtherReason = details?.blockDetails.blockType !== 'payment'
  const isBlocked = details?.blocked
  const canEdit = !isBlocked
  const canUnblockCustomer =
    details?.blocked && details?.blockDetails.blockType === 'resale'

  return (
    <Card.Root borderColor="zinc.200">
      <Card.Header>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          {details?.blocked ? (
            <Tag size="lg" paddingY="1" colorPalette="red" width="fit-content">
              <Text fontSize="xs">
                {tagType[details.blockDetails.blockType]}
              </Text>
            </Tag>
          ) : (
            <Tag
              size="lg"
              paddingY="1"
              colorPalette="purple"
              width="fit-content"
            >
              <Text fontSize="xs">Liberado</Text>
            </Tag>
          )}
        </Skeleton>
      </Card.Header>

      <Card.Body spaceY="3">
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText label="Plano: " value={details?.plan.description} />
        </Skeleton>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText
            infoValueProps={{ display: 'block', whiteSpace: 'wrap' }}
            label="Módulos: "
            value={
              <HStack display="inline" spaceX="1">
                {details?.modules.map((module) => (
                  <Tag key={module.id} size="sm">
                    {module.totalQuantity > 1 && `${module.totalQuantity}x `}
                    {module.description}
                  </Tag>
                ))}
              </HStack>
            }
          />
        </Skeleton>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText
            infoValueProps={{ display: 'block' }}
            label="Valor da assinatura: "
            value={
              <FormatNumber
                value={details?.subscriptionValue || 0}
                style="currency"
                currency="BRL"
              />
            }
          />
        </Skeleton>
        {details?.blocked && (
          <Skeleton maxWidth="fit-content" loading={isClientLoading}>
            <InfoText
              infoValueProps={{
                whiteSpace: 'wrap',
              }}
              label="Bloquear em: "
              value={`${formatDate(details?.blockDetails.blockDate)},
                ${details?.blockDetails.blockReason?.toLowerCase()}.
                Ação realizada em ${formatDateTime(details?.blockDetails.blockAt)}.
              `}
            />
          </Skeleton>
        )}
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText
            label="Data de validade da licença: "
            value={
              details?.licenseExpirationDate
                ? formatDate(details?.licenseExpirationDate)
                : '-'
            }
          />
        </Skeleton>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText
            label="Quantidade de máquinas padrão: "
            value={details?.plan.quantity}
          />
        </Skeleton>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText label="Segmento: " value={details?.segment.description} />
        </Skeleton>
      </Card.Body>

      {isBlockedForOtherReason && (
        <Card.Footer justifyContent="flex-end">
          <Skeleton maxWidth="fit-content" loading={isClientLoading}>
            {canEdit && (
              <Button asChild>
                <Link to={`/clients/${clientId}/plans/${details?.plan.id}`}>
                  Editar assinatura
                </Link>
              </Button>
            )}
          </Skeleton>
          <Skeleton maxWidth="fit-content" loading={isClientLoading}>
            {canUnblockCustomer ? (
              <UnblockCustomer clientId={clientId} />
            ) : (
              <BlockCustomer clientId={clientId} />
            )}
          </Skeleton>
        </Card.Footer>
      )}
    </Card.Root>
  )
}
