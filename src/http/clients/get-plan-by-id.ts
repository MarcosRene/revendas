import { api } from '@/lib/axios'

import {
  AxiosGetPlanMapper,
  type GetPlanResponse,
} from '../mappers/axios-get-plan-mapper'

interface PlanByIdRequest {
  planId?: string
}

export async function getPlanById({ planId }: PlanByIdRequest) {
  const response = await api.get<GetPlanResponse>(`/revendas/planos/${planId}`)

  return AxiosGetPlanMapper.toDomain(response.data)
}
