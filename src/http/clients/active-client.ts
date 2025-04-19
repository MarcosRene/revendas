import { type Module } from '@/dtos/types'
import { api } from '@/lib/axios'

import { AxiosActiveClientMapper } from '../mappers/axios-active-client-mapper'
import { AxiosCreateClientMapper } from '../mappers/axios-create-client-mapper'
import { type CreateClientResponse as ActiveClientResponse } from './create-client'

export interface ActiveClientRequest {
  cliendId: number
  planId: number
  modules: Module[]
}

export async function activeClient({
  cliendId,
  planId,
  modules,
}: ActiveClientRequest) {
  const response = await api.post<ActiveClientResponse>(
    `/revendas/clientes/${cliendId}/ativar`,
    AxiosActiveClientMapper.toPersistence({ planId, modules })
  )

  return AxiosCreateClientMapper.toDomain(response.data)
}
