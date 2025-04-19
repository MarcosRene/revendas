import { api } from '@/lib/axios'

import {
  AxiosGetWhiteLabelMapper,
  type GetWhiteLabelResponse,
} from '../mappers/axios-get-white-label'

export async function getWhiteLabel() {
  const response = await api.get<GetWhiteLabelResponse>(`/revendas/white-label`)

  return AxiosGetWhiteLabelMapper.toDomain(response.data)
}
