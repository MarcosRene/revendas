import { type UnsubscribeRequest } from '../clients/unsubscribe'

export class AxiosUnsubscribeMapper {
  static toPersistence(data: Omit<UnsubscribeRequest, 'clientId'>) {
    return {
      idMotivoDesativacao: data.reason,
      observacoes: data.observation,
    }
  }
}
