import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { toaster } from '@/components/ui/toaster'
import { updatePassword as updatePasswordAPI } from '@/http/profile/update-password'
import { errorHandler } from '@/utils/error-handler'

import { PasswordUpdateForm } from './password-update-form'

const PasswordUpdateValidationSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'A senha é obrigatória' }),
    newPassword: z
      .string()
      .min(6, { message: 'A nova senha deve ter ao menos 6 caracteres' }),
    confirmNewPassword: z.string(),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: 'Senhas não conferem',
      path: ['confirmNewPassword'],
    }
  )

type PasswordUpdateFormData = z.infer<typeof PasswordUpdateValidationSchema>

export function PasswordUpdate() {
  const [openPasswordUpdateDrawer, setOpenPasswordUpdateDrawer] =
    useState(false)

  const methods = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(PasswordUpdateValidationSchema),
  })

  const { mutateAsync: updatePasswordFn, isPending: isPasswordUpdating } =
    useMutation({
      mutationFn: updatePasswordAPI,
      onSuccess: () => {
        methods.reset()
        setOpenPasswordUpdateDrawer(false)

        toaster.success({
          title: errorHandler('Sua senha foi alterada com sucesso'),
        })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  async function onUpdatePassword(data: PasswordUpdateFormData) {
    await updatePasswordFn(data)
  }

  return (
    <FormProvider {...methods}>
      <PasswordUpdateForm
        onSubmit={onUpdatePassword}
        open={openPasswordUpdateDrawer}
        onOpenChange={({ open }) => setOpenPasswordUpdateDrawer(open)}
        isLoading={isPasswordUpdating}
      />
    </FormProvider>
  )
}
