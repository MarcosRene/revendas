import { api } from '@/lib/axios'

import { AxiosSegmentsMapper } from '../mappers/axios-segments-mapper'

export interface SegmentResponse {
  id: number
  descricao: string
}

export async function getSegments() {
  const response = await api.get<SegmentResponse[]>(
    '/revendas/consultas/segmentos'
  )
  return response.data.map(AxiosSegmentsMapper.toDomain)
}
