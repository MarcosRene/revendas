import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { toaster } from '@/components/ui/toaster'
import { newPassword } from '@/http/forgot-password/new-password'
import { errorHandler } from '@/utils/error-handler'

const newPasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Senha deve ter ao menos 6 caracteres' }),
    confirmNewPassword: z.string(),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: 'Senhas não conferem',
      path: ['confirmNewPassword'],
    }
  )

type NewPasswordFormData = z.infer<typeof newPasswordValidationSchema>

type ParamsProps = {
  code: string
}

export function NewPassword() {
  const { code } = useParams<ParamsProps>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordValidationSchema),
  })

  const { mutateAsync: newPasswordFn, isPending: isCreatingNewPassword } =
    useMutation({
      mutationFn: newPassword,
      onSuccess: () => {
        toaster.success({
          title: 'Sua senha foi alterada com sucesso',
        })

        navigate('/', { replace: true })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  async function onNewPassword(data: NewPasswordFormData) {
    if (!code) return

    await newPasswordFn({
      code,
      newPassword: data.newPassword,
    })
  }

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onNewPassword)}
      width="full"
      gap="4"
    >
      <Field
        label="Nova senha"
        invalid={!!errors.newPassword}
        errorText={errors.newPassword?.message}
      >
        <PasswordInput
          placeholder="Sua nova senha"
          {...register('newPassword')}
        />
      </Field>

      <Field
        label="Confirme sua nova senha"
        invalid={!!errors.confirmNewPassword}
        errorText={errors.confirmNewPassword?.message}
      >
        <PasswordInput
          placeholder="Confirme nova senha"
          {...register('confirmNewPassword')}
        />
      </Field>

      <Button width="full" type="submit" loading={isCreatingNewPassword}>
        Confirmar
      </Button>
    </Stack>
  )
}
