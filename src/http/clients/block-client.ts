import { api } from '@/lib/axios'

import { AxiosBlockClientMapper } from '../mappers/axios-block-client-mapper'

export interface BlockClientRequest {
  clientId: string
  blockType: string
  blockDate: string
  blockReason: string
  clientMessage: string
}

export async function blockClient({ clientId, ...data }: BlockClientRequest) {
  await api.post(
    `/revendas/clientes/${clientId}/bloquear`,
    AxiosBlockClientMapper.toPersistence(data)
  )
}
