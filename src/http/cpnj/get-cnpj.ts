import { api } from '@/lib/axios'

import { AxiosGetCnpjMapper } from '../mappers/axios-get-cnpj-mapper'

interface GetCnpjRequest {
  cnpj?: string
}

export interface GetCnpjReponse {
  razaoSocial: string
  nomeFantasia: string
  inscricaoEstadual: string
  inscricaoMunicipal: string
  telefone: string
  celular: string
  email: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

export async function getCnpj({ cnpj }: GetCnpjRequest) {
  const response = await api.get<GetCnpjReponse>(
    `revendas/consultas/cnpj/${cnpj}`
  )

  return AxiosGetCnpjMapper.toDomain(response.data)
}
