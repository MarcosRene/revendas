import { createListCollection, Flex, Tooltip } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
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
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
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
        return onlyNumbers.length === 11 || onlyNumbers.length === 14
      },
      { message: 'O CPF/CNPJ deve conter apenas números' }
    ),
})

type CNPJValidationSchema = z.infer<typeof cnpjValidationSchema>

export function ValidateDocument() {
  const navigate = useNavigate()
  const [documentType, setDocumentType] = useState('cpf')

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

  async function onValidateDocument(data: CNPJValidationSchema) {
    try {
      const formattedDocumentNumber = data.number.replace(/\D/g, '')

      if (!formattedDocumentNumber) return

      const { exists: cnpjAlreadyExists } = await validate({
        cnpj: formattedDocumentNumber,
      })

      if (cnpjAlreadyExists) {
        toaster.error({
          title: errorHandler('O CPF/CNPJ já está cadastrado no sistema'),
        })
        return
      }

      navigate(`/clients/${formattedDocumentNumber}/new`)
    } catch (error) {
      throw error
    }
  }

  return (
    <SectionRoot>
      <SectionHeader>
        <SectionTitle>Documento</SectionTitle>
        <SectionDescription>
          É necessário validar o documento do cliente antes de poder adiciona-ló
          ao sistema.
        </SectionDescription>
      </SectionHeader>

      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link to="/clients">Clientes</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>Novo</BreadcrumbCurrentLink>
      </BreadcrumbRoot>

      <SectionBody as="form" onSubmit={handleSubmit(onValidateDocument)}>
        <Flex gap="4" alignItems="flex-end">
          <Controller
            control={control}
            name="number"
            render={({ field: { ...rest } }) => {
              return (
                <Field
                  label="Documento do cliente"
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
                        documentType === 'cpf'
                          ? '###.###.###-##'
                          : '##.###.###/####-##'
                      }
                    />
                  </TextInput>
                </Field>
              )
            }}
          />
          <SelectRoot
            width={{ base: '2/6', md: '2/12' }}
            collection={createListCollection({
              items: [
                {
                  label: 'CPF',
                  value: 'cpf',
                },
                {
                  label: 'CNPJ',
                  value: 'cnpj',
                },
              ],
            })}
            value={[documentType]}
            onValueChange={({ value }) => setDocumentType(value[0])}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Selecione a Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem item={'cpf'} key={'cpf'}>
                CPF
              </SelectItem>
              <SelectItem item={'cnpj'} key={'cnpj'}>
                CNPJ
              </SelectItem>
            </SelectContent>
          </SelectRoot>
        </Flex>
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
