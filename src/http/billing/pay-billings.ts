import { api } from '@/lib/axios'

import { AxiosPayBillingMapper } from '../mappers/axios-pay-billing-mapper'
import { type PayBillingResponse } from './types'

export interface PayCollectionsRequest {
  billingIds?: string[]
}

export async function payBillings({ billingIds }: PayCollectionsRequest) {
  const response = await api.post<PayBillingResponse>(`/revendas/cobrancas`, {
    cobrancas: billingIds?.map((billingId) => ({
      id: billingId,
    })),
  })

  return AxiosPayBillingMapper.toDomain(response.data)
}
