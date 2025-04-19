import { type Module } from '@/dtos/types'
import { api } from '@/lib/axios'

import { AxiosCreateClientMapper } from '../mappers/axios-create-client-mapper'
import { AxiosUpdateSubscriberMapper } from '../mappers/axios-update-subscriber-mapper'
import { type CreateClientResponse } from './create-client'

export interface UpdateSubscriptionRequest {
  clientId?: string
  planId?: string
  modules?: Module[]
}

export type UpdateSubscriptionResponse = CreateClientResponse

export async function updateSubscription({
  clientId,
  ...data
}: UpdateSubscriptionRequest) {
  const response = await api.put<UpdateSubscriptionResponse>(
    `/revendas/clientes/${clientId}/assinatura`,
    AxiosUpdateSubscriberMapper.toPersistence(data)
  )

  return AxiosCreateClientMapper.toDomain(response.data)
}
