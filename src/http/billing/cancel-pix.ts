import { api } from '@/lib/axios'

import { AxiosPayBillingMapper } from '../mappers/axios-pay-billing-mapper'
import { type PayBillingResponse } from './types'

export interface CancelPixRequest {
  pixId?: string
}

export interface CancelPixResponse extends PayBillingResponse {}

export async function cancelPix({ pixId }: CancelPixRequest) {
  const response = await api.delete<CancelPixResponse>(
    `/revendas/cobrancas/pix/${pixId}`
  )

  return AxiosPayBillingMapper.toDomain(response.data)
}
