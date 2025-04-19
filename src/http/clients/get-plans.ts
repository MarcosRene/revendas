import { api } from '@/lib/axios'

import {
  AxiosGetPlanMapper,
  type GetPlanResponse,
} from '../mappers/axios-get-plan-mapper'

export async function getPlans() {
  const response = await api.get<GetPlanResponse[]>(`/revendas/planos`)

  return response.data.map(AxiosGetPlanMapper.toDomain)
}
