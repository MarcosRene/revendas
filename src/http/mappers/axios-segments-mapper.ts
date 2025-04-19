import { type SegmentResponse } from '../clients/get-segments'

export class AxiosSegmentsMapper {
  static toDomain(data: SegmentResponse) {
    return {
      id: data.id,
      description: data.descricao,
    }
  }
}
