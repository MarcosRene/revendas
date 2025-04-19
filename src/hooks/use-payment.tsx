import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { toaster } from '@/components/ui/toaster'
import {
  cancelPix,
  payBilling,
  payBillings,
  registerPayment,
  verifyStatusPix,
} from '@/http/billing'
import { queryClient } from '@/lib/react-query'
import { errorHandler } from '@/utils/error-handler'

type BillingRequest = {
  billingId?: string
}

type BillingsRequest = {
  billingIds?: string[]
}

export type BillingData = {
  id: string
  status: string
  dueDate: string
  value: number
  description: string
  expirationTime: number
  qrCode: string
}

interface UsePaymentResponse {
  dialogOpen: boolean
  onDialogOpen: (open: boolean) => void
  payBilling: ({ billingId }: BillingRequest) => Promise<BillingData>
  payBillings: ({ billingIds }: BillingsRequest) => Promise<BillingData>
  cancelPixFn: () => Promise<BillingData>
  isPayingLoading: boolean
  isPayingsLoading: boolean
  isCancelLoading: boolean
  isRegisterPaymentLoading: boolean
  payment: BillingData | null | undefined
}

const REFETCH_INTERVAL = 5000

export function usePayment(): UsePaymentResponse {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [payment, setPayment] = useState<UsePaymentResponse['payment'] | null>(
    null
  )

  function onDialogOpen(open: boolean) {
    setDialogOpen(open)
  }

  const { mutateAsync: payBillingFn, isPending: isPayingLoading } = useMutation(
    {
      mutationFn: payBilling,
      onSuccess: (data) => {
        setPayment(data)
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    }
  )

  const { mutateAsync: payBillingsFn, isPending: isPayingsLoading } =
    useMutation({
      mutationFn: payBillings,
      onSuccess: (data) => {
        setPayment(data)
      },
      onError: (error) => {
        toaster.error({
          title: errorHandler(error),
        })
      },
    })

  const { mutate: registerPaymentFn, isPending: isRegisterPaymentLoading } =
    useMutation({
      mutationFn: registerPayment,
      onSuccess: () => {
        onDialogOpen(false)
      },
      onError: () => {
        toaster.error({
          title: errorHandler(
            'Não foi possível registrar o pagamento! Tente novamente.'
          ),
        })
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['verify-status-pix'] })
        queryClient.invalidateQueries({ queryKey: ['clients'] })
        queryClient.invalidateQueries({ queryKey: ['billings'] })
      },
    })

  const { mutateAsync: cancelPixFn, isPending: isCancelLoading } = useMutation({
    mutationFn: () => cancelPix({ pixId: payment?.id }),
    onSuccess: (data) => {
      setPayment(data)
      onDialogOpen(false)
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['verify-status-pix'] })
    },
  })

  useEffect(() => {
    const statusType = ['paid', 'cancelled']
    if (!payment?.id || statusType.includes(payment.status)) return

    const interval = setInterval(async () => {
      try {
        const paymentReponse = await queryClient.fetchQuery<
          UsePaymentResponse['payment']
        >({
          queryKey: ['verify-status-pix'],
          queryFn: () => verifyStatusPix({ pixId: payment.id }),
        })

        if (paymentReponse?.status === 'paid') {
          registerPaymentFn({ pixId: paymentReponse.id })
          setPayment(paymentReponse)
        }
      } catch (error) {
        toaster.error({
          title: errorHandler(error),
        })
      }
    }, REFETCH_INTERVAL)

    return () => clearInterval(interval)
  }, [payment])

  const values = useMemo(
    () => ({
      dialogOpen,
      onDialogOpen,
      payBilling: payBillingFn,
      payBillings: payBillingsFn,
      cancelPixFn,
      isPayingLoading,
      isPayingsLoading,
      isCancelLoading,
      isRegisterPaymentLoading,
      payment,
    }),
    [
      dialogOpen,
      payBillingFn,
      payBillingsFn,
      cancelPixFn,
      isPayingLoading,
      isPayingsLoading,
      isCancelLoading,
      isRegisterPaymentLoading,
      payment,
    ]
  )

  return values
}
