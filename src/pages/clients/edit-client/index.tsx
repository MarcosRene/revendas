import { Box, Card } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import { z } from 'zod'

import {
  SectionActions,
  SectionBody,
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
import { toaster } from '@/components/ui/toaster'
import { type ClientFormStateProps } from '@/dtos/types'
import { useClientForm } from '@/hooks/use-client-form'
import { useGetClientDetails } from '@/hooks/use-get-client-details'
import { updateClient } from '@/http/clients/update-client'
import { errorHandler } from '@/utils/error-handler'
import { formatCNPJ } from '@/utils/format-cnpj'

import { EditClientForm } from './client-form'
import { ClientSkeleton } from './skeleton'

const editClientFormValidationSchema = z.object({
  name: z.string().min(1, { message: 'A razão social é obrigatória' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  responsibleName: z.string().min(1, { message: 'Responsável é obrigatório' }),
  responsiblePhone: z
    .string()
    .min(1, { message: 'Telefone do responsável é obrigatório' }),
  ie: z.string(),
  im: z.string(),
  email: z.string().min(1, { message: 'E-mail é obrigatório' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  cell: z.string({ message: 'Celular é obrigatório' }),
  address: z.object({
    state: z.string().min(1, { message: 'Estado é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatório' }),
    neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
    street: z.string().min(1, { message: 'Rua é obrigatório' }),
    number: z.string().min(1, { message: 'Número é obrigatório' }),
    complement: z.string(),
    zipCode: z.string().min(1, { message: 'CEP é obrigatório' }),
  }),
  segment: z.object({
    id: z.number({ message: 'Segmento é obrigatório' }),
    description: z.string().min(1, { message: 'Descrição é obrigatório' }),
  }),
})

type EditClientFormData = z.infer<typeof editClientFormValidationSchema>

type UpdateClientParams = {
  id: string
}

export function EditClient() {
  const { id: clientId } = useParams<UpdateClientParams>()
  const navigate = useNavigate()
  const { setFormState } = useClientForm<ClientFormStateProps>()

  const methods = useForm<EditClientFormData>({
    resolver: zodResolver(editClientFormValidationSchema),
  })

  const { details, isClientLoading } = useGetClientDetails({ clientId })

  const shouldShowEditClientForm = !isClientLoading && details

  const { mutateAsync: updateClientFn, isPending: isUpdatingClient } =
    useMutation({
      mutationFn: updateClient,
      onSuccess: async ({ id }) => {
        navigate(`/clients/${id}/details`)

        toaster.success({
          title: 'Cliente atualizado com sucesso!',
        })

        setFormState({ plan: null, modules: [] })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  async function onUpdateClient(data: EditClientFormData) {
    await updateClientFn({
      ...data,
      cnpj: details?.cnpj,
      clientId,
      segment: data.segment.id,
    })
  }

  useEffect(() => {
    if (!details) return

    methods.reset(details)
  }, [details, methods])

  return (
    <FormProvider {...methods}>
      <SectionRoot>
        <SectionTitle>Editar cliente</SectionTitle>

        <BreadcrumbRoot>
          <BreadcrumbLink asChild>
            <Link to="/clients">Clientes</Link>
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>Editar</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        {isClientLoading && <ClientSkeleton />}

        <Box as="form" onSubmit={methods.handleSubmit(onUpdateClient)}>
          {shouldShowEditClientForm && (
            <SectionBody>
              <Card.Root borderColor="zinc.200">
                <Card.Header>
                  <Card.Title
                    textAlign="center"
                    backgroundColor="purple.50"
                    color="purple.950"
                    borderRadius="l3"
                    padding="5"
                  >
                    CNPJ: {formatCNPJ(details?.cnpj)}
                  </Card.Title>
                </Card.Header>

                <Card.Body spaceY="10">
                  <EditClientForm />
                </Card.Body>
              </Card.Root>
            </SectionBody>
          )}
          <SectionActions display="flex" justifyContent="space-between">
            <Skeleton loading={isClientLoading}>
              <Button variant="outline" disabled={isUpdatingClient} asChild>
                <Link to={`/clients/${clientId}/details`}>Voltar</Link>
              </Button>
            </Skeleton>
            <Skeleton loading={isClientLoading}>
              <Button type="submit" loading={isUpdatingClient}>
                Salvar
              </Button>
            </Skeleton>
          </SectionActions>
        </Box>
      </SectionRoot>
    </FormProvider>
  )
}
