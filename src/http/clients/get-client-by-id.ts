import { api } from '@/lib/axios'

import { type CreateClientResponse as GetClientByIdResponse } from '../clients/create-client'
import { AxiosCreateClientMapper } from '../mappers/axios-create-client-mapper'

interface GetClientByIdRequest {
  clientId?: string
}

export async function getClientById({ clientId }: GetClientByIdRequest) {
  const reponse = await api.get<GetClientByIdResponse>(
    `/revendas/clientes/${clientId}`
  )

  return AxiosCreateClientMapper.toDomain(reponse.data)
}
