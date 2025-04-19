import { type ReasonsCancellationResponse } from '../clients/reasons-cancellation'

export class AxiosReasonsCancellationMapper {
  static toDomain(data: ReasonsCancellationResponse) {
    return {
      id: data.id,
      description: data.descricao,
    }
  }
}
