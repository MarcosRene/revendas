import { createListCollection, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

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
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { toaster } from '@/components/ui/toaster'
import { reasonsCancellation } from '@/http/clients/reasons-cancellation'
import { unsubscribe } from '@/http/clients/unsubscribe'
import { errorHandler } from '@/utils/error-handler'

const unsubscribeFormValidationSchema = z.object({
  clientId: z.string(),
  reason: z.number({ message: 'O motivo é obrigatório' }),
  observation: z.string().optional(),
})

type UnsubscrineFormData = z.infer<typeof unsubscribeFormValidationSchema>

interface UnsubscribeProps {
  clientId: string | undefined
}

export function Unsubscribe({ clientId }: UnsubscribeProps) {
  const navigate = useNavigate()
  const dialogCloseTriggerRef = useRef<HTMLButtonElement | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UnsubscrineFormData>({
    resolver: zodResolver(unsubscribeFormValidationSchema),
    defaultValues: {
      clientId,
    },
  })

  const { data: reasons, isLoading: isReasonsLoading } = useQuery({
    queryKey: ['reasons-cancellation'],
    queryFn: reasonsCancellation,
  })

  const reasonList = createListCollection({
    items: reasons
      ? reasons?.map((item) => ({
          label: item.description,
          value: item.id,
        }))
      : [],
  })

  const { mutateAsync: unsubscribeFn, isPending: isUnsubscribing } =
    useMutation({
      mutationFn: unsubscribe,
      onSuccess: () => {
        reset()
        dialogCloseTriggerRef.current?.click()

        navigate('/clients', { replace: true })

        toaster.success({
          title: 'A assinatura do cliente foi cancelada com sucesso!',
        })
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  async function onUnsubscribe(data: UnsubscrineFormData) {
    await unsubscribeFn(data)
  }

  return (
    <DialogRoot lazyMount motionPreset="slide-in-bottom" placement="center">
      <DialogTrigger asChild>
        <Button colorPalette="red">Cancelar assinatura</Button>
      </DialogTrigger>

      <DialogContent as="form" onSubmit={handleSubmit(onUnsubscribe)}>
        <DialogHeader flexDirection="column">
          <DialogTitle>Cancelar assinatura</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja cancelar a assinatura do cliente e
            desativá-lo? Isso impedirá o cliente de utilizar o software.
          </DialogDescription>
        </DialogHeader>

        <DialogBody spaceY="4">
          <Skeleton loading={isReasonsLoading}>
            <Field
              invalid={!!errors.reason}
              errorText={errors.reason?.message}
              label="Motivo"
            >
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={[field.value as unknown as string]}
                    onValueChange={({ value }) => field.onChange(value[0])}
                    onInteractOutside={() => field.onBlur()}
                    collection={reasonList}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent zIndex="max">
                      {reasonList.items.map((movie) => (
                        <SelectItem item={movie} key={movie.value}>
                          {movie.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
            </Field>
          </Skeleton>

          <Field label="Observação">
            <Textarea
              {...register('observation')}
              placeholder="Descreva o motivo do cancelamento aqui..."
            />
          </Field>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Skeleton maxWidth="fit-content" loading={isReasonsLoading}>
              <Button variant="outline">Cancelar</Button>
            </Skeleton>
          </DialogActionTrigger>
          <Skeleton maxWidth="fit-content" loading={isReasonsLoading}>
            <Button type="submit" loading={isUnsubscribing}>
              Confirmar
            </Button>
          </Skeleton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
