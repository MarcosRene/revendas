import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { type ClipboardEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { PinInput } from '@/components/ui/pin-input'
import { toaster } from '@/components/ui/toaster'
import { validateCode } from '@/http/forgot-password/validate-code'
import { errorHandler } from '@/utils/error-handler'

const validationCodeSchema = z.object({
  pin: z
    .array(z.string().min(1), { message: 'O código é obrigatório' })
    .length(6, { message: 'O codigo deve ter 6 dígitos' }),
})

type ValidationCodeForm = z.infer<typeof validationCodeSchema>

export function ValidateCode() {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationCodeForm>({
    resolver: zodResolver(validationCodeSchema),
  })

  function formatPinInputValue(value: string[]) {
    return value.map((char) => char.replace(/[^0-9]/g, ''))
  }

  function handlePinPaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault()
    const pastedText = event.clipboardData
      .getData('text')
      .replace(/[^0-9]/g, '')

    return pastedText.split('').slice(0, 6)
  }

  const { mutateAsync: validateCodeFn, isPending: isValidatingCode } =
    useMutation({
      mutationFn: validateCode,
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  async function onValidateCode(data: ValidationCodeForm) {
    const code = data.pin.toString().replace(/,/g, '')
    const formattedCode = code.replace(/(\d{3})(\d+)/, '$1-$2')

    await validateCodeFn({ code: formattedCode })
    navigate(`/forgot-password/${formattedCode}/new`)
  }

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onValidateCode)}
      width="full"
      gap="4"
    >
      <Field
        label="Código"
        invalid={!!errors.pin}
        errorText={errors.pin?.message}
      >
        <Controller
          control={control}
          name="pin"
          render={({ field: { value, onChange } }) => {
            return (
              <PinInput
                value={value}
                onValueChange={({ value }) =>
                  onChange(formatPinInputValue(value))
                }
                onPaste={(event) => {
                  const newValue = handlePinPaste(event)
                  onChange(newValue)
                }}
                count={6}
              />
            )
          }}
        />
      </Field>

      <Button type="submit" loading={isValidatingCode}>
        Verificar
      </Button>
    </Stack>
  )
}
