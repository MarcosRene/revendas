import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'

import { MaskedInput } from '@/components/masked-input'
import {
  SectionActions,
  SectionBody,
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from '@/components/section'
import { TextInput } from '@/components/text-input'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { valitate as validateAPI } from '@/http/cpnj/validate'
import { errorHandler } from '@/utils/error-handler'

const cnpjValidationSchema = z.object({
  number: z
    .string()
    .nonempty({
      message: 'CPF/CNPJ é obrigatório',
    })
    .min(11, { message: 'O CPF/CNPJ deve ter pelo menos 11 dígitos' })
    .refine(
      (value) => {
        const onlyNumbers = value.replace(/\D/g, '')
        return onlyNumbers.length === 14
      },
      { message: 'O CPF/CNPJ deve conter apenas números' }
    ),
})

type CNPJValidationSchema = z.infer<typeof cnpjValidationSchema>

export function ValidateCNPJ() {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CNPJValidationSchema>({
    resolver: zodResolver(cnpjValidationSchema),
    defaultValues: {
      number: '',
    },
  })

  const { mutateAsync: validate, isPending: isValidating } = useMutation({
    mutationFn: validateAPI,
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })
    },
  })

  async function onSubmit(data: CNPJValidationSchema) {
    try {
      const formattedCNPJNumber = data.number.replace(/\D/g, '')

      if (!formattedCNPJNumber) return

      const { exists: cnpjAlreadyExists } = await validate({
        cnpj: formattedCNPJNumber,
      })

      if (cnpjAlreadyExists) {
        toaster.error({
          title: errorHandler('O CPF/CNPJ já está cadastrado no sistema'),
        })
        return
      }

      navigate(`/clients/${formattedCNPJNumber}/new`)
    } catch (error) {
      throw error
    }
  }

  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>CNPJ</SectionTitle>
        <SectionDescription>
          É necessário validar o CNPJ do cliente antes de poder adiciona-ló ao
          sistema.
        </SectionDescription>
      </SectionHeader>

      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link to="/clients">Clientes</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Novo</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <SectionBody as="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="number"
          render={({ field: { value, ...rest } }) => (
            <Field
              label="CPF/CNPJ do cliente"
              invalid={!!errors.number}
              errorText={errors.number?.message}
            >
              <TextInput
                maxLength={19}
                placeholder="999.999.999-99"
                asChild
                {...rest}
              >
                <MaskedInput
                  format={
                    value?.replace(/\D/g, '').length === 11
                      ? '###.###.###-##'
                      : '##.###.###/####-##'
                  }
                />
              </TextInput>
            </Field>
          )}
        />
        <SectionActions justifyContent="space-between">
          <Button variant="outline" loading={isValidating} asChild>
            <Link to="/clients/modules">Voltar</Link>
          </Button>
          <Button type="submit" loading={isValidating}>
            Confirmar
          </Button>
        </SectionActions>
      </SectionBody>
    </SectionRoot>
  )
}
