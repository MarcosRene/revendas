import { api } from '@/lib/axios'

import { AxiosUpdateUserMapper } from '../mappers/axios-update-user-mapper'

export interface UpdateUserRequest {
  name: string
  description: string
  responsibleName: string
  ie?: string
  email: string
  phone: string
  cell: string
  address: {
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
    zipCode: string
  }
  instagram?: string
}

export async function updateUser(data: UpdateUserRequest) {
  const response = await api.put(
    '/revendas/dados',
    AxiosUpdateUserMapper.toPersistence(data)
  )

  return AxiosUpdateUserMapper.toDomain(response.data)
}
