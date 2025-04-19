import { api } from '@/lib/axios'

import {
  AxiosGetModuleMapper,
  type GetModuleResponse,
} from '../mappers/axios-get-module-mapper'

export async function getModules() {
  const response = await api.get<GetModuleResponse[]>('/revendas/modulos')

  return response.data.map(AxiosGetModuleMapper.toDomain)
}
