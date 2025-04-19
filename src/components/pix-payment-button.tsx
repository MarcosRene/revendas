import { Badge, FormatNumber, Stack } from '@chakra-ui/react'
import { type ButtonProps } from 'react-day-picker'
import { MdOutlinePix } from 'react-icons/md'

import { Timer } from '@/components/timer'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  ClipboardIconButton,
  ClipboardInput,
  ClipboardRoot,
} from '@/components/ui/clipboard'
import { CloseButton } from '@/components/ui/close-button'
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InputGroup } from '@/components/ui/input-group'
import { QrCode } from '@/components/ui/qr-code'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'
import { usePayment } from '@/hooks/use-payment'
import { verifyStatusPix } from '@/http/billing'
import { queryClient } from '@/lib/react-query'

import { toaster } from './ui/toaster'

type StatusType = { label: string; color: string }

interface PixPaymentButtonProps {
  billingIds?: string[]
  billingId?: string
  disabled?: ButtonProps['disabled']
}

export function PixPaymentButton({
  billingIds,
  billingId,
  disabled,
}: PixPaymentButtonProps) {
  const {
    dialogOpen,
    onDialogOpen,
    payBilling,
    payBillings,
    cancelPixFn,
    isPayingLoading,
    isPayingsLoading,
    isCancelLoading,
    isRegisterPaymentLoading,
    payment,
  } = usePayment()

  const statuType: Record<string, StatusType> = {
    pending: {
      label: 'Aguardando pagamento',
      color: 'orange',
    },
    paid: {
      label: 'Pagamento efetuado',
      color: 'purple',
    },
    cancelled: { label: 'Pagamento cancelado', color: 'red' },
    returned: {
      label: 'Pagamento cancelado',
      color: 'red',
    },
  }

  function showPixCopySuccess() {
    toaster.success({
      title: 'O pix foi copiado para a área de transferência',
    })
  }

  async function handlePixCancellation() {
    const { status } = await queryClient.fetchQuery({
      queryKey: ['verify-status-pix'],
      queryFn: () => verifyStatusPix({ pixId: payment?.id }),
    })

    if (status === 'paid') return

    await cancelPixFn()
  }

  async function handlerPayWithPix() {
    await (billingIds && billingIds?.length > 1
      ? payBillings({ billingIds })
      : payBilling({ billingId }))
  }

  const isLoading = isPayingLoading || isPayingsLoading || !payment
  const currentPaymentStatus = payment?.status ? payment.status : 'pending'
  const shouldDisablePaidStatusButton =
    isRegisterPaymentLoading || payment?.status === 'paid'

  return (
    <DialogRoot
      lazyMount
      open={dialogOpen}
      onOpenChange={({ open }) => onDialogOpen(open)}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          onClick={handlerPayWithPix}
          disabled={disabled}
        >
          <MdOutlinePix /> Pagar com pix
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader
          borderBottomWidth="thin"
          borderBottomColor="zinc.200"
          display="flex"
          flexDirection="column"
          gap="2"
        >
          <Skeleton loading={isLoading}>
            <DialogTitle textAlign="center">
              Leia o QRCode e efetue o pagamento
            </DialogTitle>
          </Skeleton>
          <DialogDescription textAlign="center">
            <Skeleton maxWidth="fit-content" margin="auto" loading={isLoading}>
              {isRegisterPaymentLoading ? (
                <Tag colorPalette="purple">
                  Registrando o pagamento das cobranças...
                </Tag>
              ) : (
                <Tag colorPalette={statuType[currentPaymentStatus].color}>
                  {statuType[currentPaymentStatus].label}
                </Tag>
              )}
            </Skeleton>
          </DialogDescription>
        </DialogHeader>
        <DialogBody paddingY="8">
          <Stack alignItems="center" spaceY="4">
            <Skeleton loading={isLoading}>
              <Badge
                size="lg"
                fontSize="lg"
                fontWeight="semibold"
                colorPalette="purple"
              >
                <FormatNumber
                  value={payment?.value || 0}
                  style="currency"
                  currency="BRL"
                />
              </Badge>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <QrCode size="2xl" value={payment?.qrCode} />
            </Skeleton>
            <Skeleton loading={isLoading}>
              <ClipboardRoot value={payment?.qrCode}>
                <InputGroup
                  endElement={
                    <ClipboardIconButton me="-2" onClick={showPixCopySuccess} />
                  }
                >
                  <ClipboardInput />
                </InputGroup>
              </ClipboardRoot>
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Timer
                status={payment?.status || ''}
                seconds={payment?.expirationTime || 0}
                onExpire={handlePixCancellation}
              />
            </Skeleton>
            <Skeleton loading={isLoading}>
              <Alert
                size="sm"
                status="warning"
                title="Certifique-se de não fechar o tela antes de concluir o pagamento."
              />
            </Skeleton>
          </Stack>
        </DialogBody>
        <DialogFooter justifyContent="center">
          <Skeleton loading={isLoading}>
            <Button
              colorPalette="red"
              onClick={handlePixCancellation}
              loading={isCancelLoading}
              disabled={shouldDisablePaidStatusButton}
            >
              Cancelar transação
            </Button>
          </Skeleton>
        </DialogFooter>
        <CloseButton
          position="absolute"
          top="2"
          insetEnd="2"
          onClick={cancelPixFn}
          disabled={shouldDisablePaidStatusButton || isCancelLoading}
        />
      </DialogContent>
    </DialogRoot>
  )
}
