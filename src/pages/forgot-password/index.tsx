import { Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'

import { TextInput } from '@/components/text-input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { forgotPassword } from '@/http/forgot-password/forgot-password'
import { errorHandler } from '@/utils/error-handler'

const recoverPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
})

type RecoverPasswordFormData = z.infer<typeof recoverPasswordValidationSchema>

export function ForgotPassword() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordValidationSchema),
  })

  const { mutateAsync: forgotPasswordFn, isPending: isSending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toaster.success({
        title: 'E-mail enviado com sucesso',
        description:
          'Enviamos um código de recuperação para o seu e-mail. Verifique sua caixa de entrada.',
      })

      navigate('/forgot-password/code')
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })
    },
  })

  async function onForgotPassword(data: RecoverPasswordFormData) {
    await forgotPasswordFn(data)
  }

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onForgotPassword)}
      width="full"
      gap="4"
    >
      <Text color="fg.muted">
        Digite um e-mail para receber o código de recuperação de senha.
      </Text>

      <Field
        label="E-mail"
        invalid={!!errors.email}
        errorText={errors.email?.message}
      >
        <TextInput {...register('email')} placeholder="Seu e-mail" />
      </Field>
      <Button width="full" type="submit" loading={isSending}>
        Confirmar
      </Button>

      <Button width="full" variant="plain" textDecoration="underline" asChild>
        <Link to="/">Voltar para login</Link>
      </Button>
    </Stack>
  )
}
