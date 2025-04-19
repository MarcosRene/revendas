import { Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { type FormEvent, useState } from 'react'

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
import { toaster } from '@/components/ui/toaster'
import { unblockClient } from '@/http/clients/unblock-client'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

import { type UnblockCustomerProps } from '../types'

export function UnblockCustomer({ clientId }: UnblockCustomerProps) {
  const [openUnblockCustomerDialog, setOpenUnblockCustomerDialog] =
    useState(false)

  const { mutateAsync: unblockClientFn, isPending: isUnblocking } = useMutation(
    {
      mutationFn: unblockClient,
      onSuccess: () => {
        setOpenUnblockCustomerDialog(false)

        toaster.success({
          title: 'O cliente foi desbloqueado com sucesso!',
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
    }
  )

  async function onUnblockClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await unblockClientFn({ clientId })
  }

  return (
    <DialogRoot
      lazyMount
      open={openUnblockCustomerDialog}
      onOpenChange={({ open }) => setOpenUnblockCustomerDialog(open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button colorPalette="purple">Desbloquear</Button>
      </DialogTrigger>

      <DialogContent as="form" onSubmit={onUnblockClient}>
        <DialogHeader>
          <DialogTitle>Desbloquear cliente</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja desbloquear o cliente?
          </DialogDescription>
        </DialogHeader>

        <DialogBody spaceY="4">
          <Text color="fg.muted">
            Ao desbloquear o cliente, você estará permitindo que ele utilize o
            sistema normalmente.
          </Text>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <Button type="submit" loading={isUnblocking}>
            Confirmar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
