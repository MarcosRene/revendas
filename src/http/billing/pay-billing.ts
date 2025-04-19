import { api } from '@/lib/axios'

import { AxiosPayBillingMapper } from '../mappers/axios-pay-billing-mapper'
import { type PayBillingResponse } from './types'

export interface PayCollectionRequest {
  billingId?: string
}

export async function payBilling({ billingId }: PayCollectionRequest) {
  const response = await api.post<PayBillingResponse>(
    `/revendas/cobrancas/${billingId}`
  )

  return AxiosPayBillingMapper.toDomain(response.data)
}
