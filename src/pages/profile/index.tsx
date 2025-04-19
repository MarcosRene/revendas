import { Card, Flex, Separator } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

import {
  SectionBody,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from '@/components/section'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { toaster } from '@/components/ui/toaster'
import { getUser } from '@/http/profile/get-user'
import { updateUser } from '@/http/profile/update-user'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

import { PasswordUpdate } from './password-update'
import { ProfileForm } from './profile-form'
import { ProfileSkeleton } from './skeleton'

const profileFormValidationSchema = z.object({
  name: z.string().min(1, { message: 'A razão social é obrigatória' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  responsibleName: z.string().min(1, { message: 'Responsável é obrigatório' }),
  ie: z.string(),
  email: z.string().min(1, { message: 'E-mail é obrigatório' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  cell: z.string().min(1, { message: 'Celular é obrigatório' }),
  address: z.object({
    state: z.string().min(1, { message: 'Estado é obrigatório' }),
    city: z.string().min(1, { message: 'Cidade é obrigatório' }),
    neighborhood: z.string().min(1, { message: 'Bairro é obrigatório' }),
    street: z.string().min(1, { message: 'Rua é obrigatório' }),
    number: z.string().min(1, { message: 'Número é obrigatório' }),
    complement: z.string(),
    zipCode: z.string().min(1, { message: 'CEP é obrigatório' }),
  }),
  instagram: z.string(),
})

type ProfileFormData = z.infer<typeof profileFormValidationSchema>

export function Profile() {
  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormValidationSchema),
  })

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  })

  const { mutateAsync: updateUserFn, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toaster.success({
        title: 'Seu perfil foi atualizado com sucesso!',
      })
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })
    },
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: ['profile'] }),
  })

  async function onUpdateUser(data: ProfileFormData) {
    await updateUserFn(data)
  }

  useEffect(() => {
    if (!profile) return

    methods.reset(profile)
  }, [profile, methods])

  return (
    <FormProvider {...methods}>
      <SectionRoot>
        <SectionHeader flexDirection="row" justifyContent="space-between">
          <SectionTitle>Meus dados</SectionTitle>

          <PasswordUpdate />
        </SectionHeader>

        {isProfileLoading && <ProfileSkeleton />}

        {!isProfileLoading && (
          <SectionBody as="form" onSubmit={methods.handleSubmit(onUpdateUser)}>
            <Card.Root borderColor="zinc.200">
              <Card.Header>
                <Card.Title
                  textAlign="center"
                  backgroundColor="purple.50"
                  color="purple.950"
                  borderRadius="l3"
                  padding="5"
                >
                  CNPJ: {profile?.cnpj}
                </Card.Title>
              </Card.Header>

              <Card.Body spaceY="10">
                <ProfileForm />

                <Separator borderColor="zinc.200" />

                <Flex display="flex" justifyContent="space-between">
                  <Skeleton loading={isProfileLoading}>
                    <Button variant="outline" asChild>
                      <Link to="/clients">Cancelar</Link>
                    </Button>
                  </Skeleton>
                  <Skeleton loading={isProfileLoading}>
                    <Button type="submit" loading={isUpdatingUser}>
                      Confirmar
                    </Button>
                  </Skeleton>
                </Flex>
              </Card.Body>
            </Card.Root>
          </SectionBody>
        )}
      </SectionRoot>
    </FormProvider>
  )
}
