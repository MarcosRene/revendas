import { api } from '@/lib/axios'

import {
  AxiosGetWhiteLabelMapper,
  type UpdateWhiteLabelRequest,
} from '../mappers/axios-get-white-label'

export async function updateWhiteLabel(data: UpdateWhiteLabelRequest) {
  const response = await api.put(
    `/revendas/white-label`,
    AxiosGetWhiteLabelMapper.toPersistence(data)
  )

  return AxiosGetWhiteLabelMapper.toDomain(response.data)
}
