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
import { toaster } from '@/components/ui/toaster'
import { type ClientFormStateProps } from '@/dtos/types'
import { useClientForm } from '@/hooks/use-client-form'
import { useGetClient } from '@/hooks/use-get-client'
import { activeClient } from '@/http/clients/active-client'
import { createClient } from '@/http/clients/create-client'
import { errorHandler } from '@/utils/error-handler'
import { formatCNPJ } from '@/utils/format-cnpj'

import { NewClientForm } from './client-form'
import { ClientSkeleton } from './skeleton'

type NewClientParams = {
  cnpj: string
}

const newClientFormValidationSchema = z.object({
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
  segment: z.number({ message: 'Segmento é obrigatório' }),
})

type NewClientFormData = z.infer<typeof newClientFormValidationSchema>

export function NewClient() {
  const { cnpj } = useParams<NewClientParams>()
  const navigate = useNavigate()
  const {
    formState: { plan, modules },
    setFormState,
  } = useClientForm<ClientFormStateProps>()

  const methods = useForm<NewClientFormData>({
    resolver: zodResolver(newClientFormValidationSchema),
  })

  const { client, isClientLoading } = useGetClient({ cnpj })
  const { mutateAsync: createClientFn, isPending: isCreatingClient } =
    useMutation({
      mutationFn: createClient,
      onSuccess: async ({ id }) => {
        if (!plan || !modules) return

        await activeClient({
          cliendId: id,
          planId: plan?.id,
          modules,
        })

        navigate(`/clients/${id}/details`)

        toaster.success({
          title: 'Cliente criado com sucesso!',
        })

        setFormState({ plan: null, modules: [] })
      },
      onError: () => {
        toaster.error({
          title: errorHandler(
            'Não foi possível criar o cliente! Tente novamente.'
          ),
        })
      },
    })

  async function onCreateClient(data: NewClientFormData) {
    await createClientFn({ ...data, cnpj })
  }

  useEffect(() => {
    if (!client) return

    methods.reset(client)
  }, [client, methods])

  return (
    <FormProvider {...methods}>
      <SectionRoot>
        <SectionTitle>Novo cliente</SectionTitle>

        <BreadcrumbRoot>
          <BreadcrumbLink asChild>
            <Link to="/clients">Clientes</Link>
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>Novo</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        {isClientLoading && <ClientSkeleton />}

        <Box as="form" onSubmit={methods.handleSubmit(onCreateClient)}>
          {!isClientLoading && (
            <SectionBody>
              <Card.Root borderColor="zinc.200" paddingBottom="6">
                <Card.Header>
                  <Card.Title
                    textAlign="center"
                    backgroundColor="purple.50"
                    color="purple.950"
                    borderRadius="l3"
                    padding="5"
                  >
                    {formatCNPJ(cnpj)}
                  </Card.Title>
                </Card.Header>

                <Card.Body>
                  <NewClientForm />
                </Card.Body>
              </Card.Root>
            </SectionBody>
          )}
          <SectionActions justifyContent="space-between">
            <Button variant="outline" disabled={isCreatingClient} asChild>
              <Link to="/clients/validate-cnpj">Voltar</Link>
            </Button>
            <Button type="submit" loading={isCreatingClient}>
              Salvar
            </Button>
          </SectionActions>
        </Box>
      </SectionRoot>
    </FormProvider>
  )
}
