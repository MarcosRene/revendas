import { api } from '@/lib/axios'

import { AxiosReasonsCancellationMapper } from '../mappers/axios-reasons-cancellation-mapper'

export interface ReasonsCancellationResponse {
  id: number
  descricao: string
}

export async function reasonsCancellation() {
  const response = await api.get<ReasonsCancellationResponse[]>(
    `revendas/consultas/motivos-desativacao`
  )

  return response.data.map(AxiosReasonsCancellationMapper.toDomain)
}
