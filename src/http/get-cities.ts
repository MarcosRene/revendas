import { api } from '@/lib/axios'

import { AxiosCityMapper } from './mappers/axios-get-city-mapper'

interface CityRequest {
  uf?: string
}

export interface CityReponse {
  codigoIBGE: number
  descricao: string
  uf: string
}

export async function getCities({ uf }: CityRequest) {
  const response = await api.get<CityReponse[]>('/revendas/consultas/cidades', {
    params: { estado: uf },
  })

  return response.data.map(AxiosCityMapper.toDomain)
}
