import { Card, GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { Link, useParams } from 'react-router'

import { InfoText } from '@/components/info-text'
import { Button } from '@/components/ui/button'
import { useGetClientDetails } from '@/hooks/use-get-client-details'
import { formatCep } from '@/utils/format-cep'
import { formatPhone } from '@/utils/format-phone'

import { type DetailsParams, type DocumentMap } from '../types'

export function CustomerInformation() {
  const { id: clientId } = useParams<DetailsParams>()

  const { details, isClientLoading } = useGetClientDetails({ clientId })

  const documentNumberMap: DocumentMap = {
    14: {
      label: 'CPF: ',
      value: details?.cnpj,
    },
    18: {
      label: 'CNPJ: ',
      value: details?.cnpj,
    },
  }

  const isBlocked = details?.blocked
  const canEdit = !isBlocked

  return (
    <Card.Root borderColor="zinc.200">
      <Card.Header>
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <Card.Title>Dados do cliente</Card.Title>
        </Skeleton>
      </Card.Header>
      <Card.Body spaceY="3">
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          {details?.cnpj && (
            <InfoText
              label={documentNumberMap[details.cnpj.length]?.label}
              value={documentNumberMap[details.cnpj.length]?.value}
            />
          )}
        </Skeleton>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                infoValueProps={{
                  whiteSpace: 'wrap',
                }}
                label="Razão social: "
                value={details?.name}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                infoValueProps={{
                  whiteSpace: 'wrap',
                }}
                label="Nome fantasia: "
                value={details?.description}
              />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Inscrição Estadual: "
                value={details?.ie || '-'}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Inscrição Municipal: "
                value={details?.im || '-'}
              />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Nome responsável: "
                value={details?.responsibleName}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Telefone responsável: "
                value={formatPhone(details?.responsiblePhone)}
              />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Telefone: "
                value={formatPhone(details?.phone)}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText label="Celular: " value={formatPhone(details?.cell)} />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          <InfoText label="E-mail: " value={details?.email} />
        </Skeleton>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="CEP: "
                value={formatCep(details?.address.zipCode)}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText label="Rua: " value={details?.address.street} />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText label="Número: " value={details?.address.number} />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Complemento: "
                value={details?.address.complement || '-'}
              />
            </Skeleton>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 6 }} gap="2">
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText
                label="Bairro: "
                value={details?.address.neighborhood}
              />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText label="Estado: " value={details?.address.state} />
            </Skeleton>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Skeleton maxWidth="fit-content" loading={isClientLoading}>
              <InfoText label="Cidade: " value={details?.address.city} />
            </Skeleton>
          </GridItem>
        </SimpleGrid>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Skeleton maxWidth="fit-content" loading={isClientLoading}>
          {canEdit && (
            <Button asChild>
              <Link to={`/clients/${details?.id}/edit`}>Editar dados</Link>
            </Button>
          )}
        </Skeleton>
      </Card.Footer>
    </Card.Root>
  )
}
