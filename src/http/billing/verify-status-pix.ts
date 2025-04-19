import { api } from '@/lib/axios'

import { AxiosPayBillingMapper } from '../mappers/axios-pay-billing-mapper'
import { type PayBillingResponse } from './types'

export interface VerifyStatusPixRequest {
  pixId?: string
}

export interface VerifyStatusPixResponse extends PayBillingResponse {}

export async function verifyStatusPix({ pixId }: VerifyStatusPixRequest) {
  const response = await api.get<VerifyStatusPixResponse>(
    `/revendas/cobrancas/pix/${pixId}`
  )

  return AxiosPayBillingMapper.toDomain(response.data)
}
