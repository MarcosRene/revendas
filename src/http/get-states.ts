import { api } from '@/lib/axios'

import { AxiosStateMapper } from './mappers/axios-get-state-mapper'

export interface StateResponse {
  descricao: string
  codigo: number
  uf: string
}

export async function getStates() {
  const response = await api.get<StateResponse[]>('/revendas/consultas/estados')

  return response.data.map(AxiosStateMapper.toDomain)
}
