import { Text, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DateSingle } from '@/components/date-single'
import { Button } from '@/components/ui/button'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { Tag } from '@/components/ui/tag'
import { toaster } from '@/components/ui/toaster'
import { blockClient } from '@/http/clients/block-client'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

import { type BlockCustomerProps } from '../types'

const blockCustomerFormValidationSchema = z.object({
  clientId: z.string(),
  blockDate: z.date(),
  blockReason: z.string().min(1, { message: 'O motivo é obrigatório' }),
  blockType: z.string().default('REVENDA'),
  clientMessage: z
    .string()
    .min(1, { message: 'A mensagem do cliente é obrigatória' }),
})

type BlockCustomerFormData = z.infer<typeof blockCustomerFormValidationSchema>

export function BlockCustomer({ clientId }: BlockCustomerProps) {
  const [openBlockCustomerDialog, setOpenBlockCustomerDialog] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlockCustomerFormData>({
    resolver: zodResolver(blockCustomerFormValidationSchema),
    defaultValues: {
      clientId,
      blockDate: new Date(),
    },
  })

  const { mutateAsync: blockClientFn, isPending: isBlocking } = useMutation({
    mutationFn: blockClient,
    onSuccess: () => {
      reset()
      setOpenBlockCustomerDialog(false)

      toaster.success({
        title: 'O cliente foi bloqueado com sucesso!',
      })
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['client', clientId] })
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  async function onBlockCustomer(data: BlockCustomerFormData) {
    await blockClientFn({ ...data, blockDate: data.blockDate.toISOString() })
  }

  return (
    <DialogRoot
      lazyMount
      open={openBlockCustomerDialog}
      onOpenChange={({ open }) => setOpenBlockCustomerDialog(open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button colorPalette="red">Bloquear</Button>
      </DialogTrigger>

      <DialogContent
        as="form"
        onSubmit={handleSubmit(onBlockCustomer)}
        spaceY="4"
      >
        <DialogHeader>
          <DialogTitle>Bloquear cliente</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja bloquear o cliente?
          </DialogDescription>
        </DialogHeader>

        <DialogBody spaceY="4">
          <Tag size="lg" paddingY="1" colorPalette="purple" width="fit-content">
            <Text fontSize="xs">Liberado</Text>
          </Tag>

          <Field
            invalid={!!errors.blockDate}
            errorText={errors.blockDate?.message}
            label="Data de Bloqueio"
          >
            <Controller
              control={control}
              name="blockDate"
              render={({ field: { value, onChange } }) => (
                <DateSingle
                  selected={value}
                  onSelect={onChange}
                  placeholder="Selecione a data de bloqueio"
                  disabled={{ before: new Date() }}
                  fullWidth
                />
              )}
            />
          </Field>
          <Field
            invalid={!!errors.blockReason}
            errorText={errors.blockReason?.message}
            label="Motivo"
          >
            <Textarea
              {...register('blockReason')}
              placeholder="Descreva o motivo do bloqueio..."
            />
          </Field>
          <Field
            invalid={!!errors.clientMessage}
            errorText={errors.clientMessage?.message}
            label="Mensagem para o cliente"
          >
            <Textarea
              {...register('clientMessage')}
              placeholder="Descreva a mensagem aqui..."
            />
          </Field>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isBlocking}>
            Confirmar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
