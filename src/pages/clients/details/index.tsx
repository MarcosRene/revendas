import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { SectionBody, SectionRoot, SectionTitle } from '@/components/section'
import { Alert } from '@/components/ui/alert'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { useGetClientDetails } from '@/hooks/use-get-client-details'

import { Billing } from './billing'
import { CustomerInformation } from './customer-information'
import { Subscription } from './subscription'
import { type DetailsParams } from './types'

export function ClientDetails() {
  const { id: clientId } = useParams<DetailsParams>()
  const { details, isClientLoading } = useGetClientDetails({ clientId })
  const [alertOpen, setAlertOpen] = useState(false)

  function handleAlertClose() {
    setAlertOpen(false)
  }

  useEffect(() => {
    if (!isClientLoading && details && details.billing) {
      setAlertOpen(details.billing.status === 'overdue')
    }
  }, [details])

  return (
    <SectionRoot paddingBottom="6">
      <SectionTitle>Detalhes do cliente</SectionTitle>

      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link to="/clients">Clientes</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Detalhes</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <SectionBody spaceY="4">
        {alertOpen && (
          <Alert
            status="warning"
            title="Atenção!"
            closable
            onClose={handleAlertClose}
          >
            Este CPF/CNPJ possui cobranças que não foram pagas anteriormente.
            Para liberar o suporte, será necessário efetuar o pagamento
            correspondente.
          </Alert>
        )}

        <Subscription />
        <CustomerInformation />
        <Billing />
      </SectionBody>
      <Button variant="outline" width="fit-content" asChild>
        <Link to="/clients">Voltar</Link>
      </Button>
    </SectionRoot>
  )
}
