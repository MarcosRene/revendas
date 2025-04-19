import { api } from '@/lib/axios'

import { AxiosGetUserMapper } from '../mappers/axios-get-user-mapper'

export interface UserResponse {
  id: number
  ativo: boolean
  razaoSocial: string
  descricao: string
  cnpj: string
  email: string
  inscEstadual: string
  telefoneCentral: string
  celularSuporte: string
  instagram: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  nomeResponsavel: string
}

export async function getUser() {
  const response = await api.get<UserResponse>('/revendas/dados')

  return AxiosGetUserMapper.toDomain(response.data)
}
