import { api } from '@/lib/axios'

import { AxiosUnsubscribeMapper } from '../mappers/axios-unsubscribe-mapper'

export interface UnsubscribeRequest {
  clientId?: string
  reason: number
  observation?: string
}

export async function unsubscribe({ clientId, ...data }: UnsubscribeRequest) {
  await api.post(
    `revendas/clientes/${clientId}/desativar`,
    AxiosUnsubscribeMapper.toPersistence(data)
  )
}
