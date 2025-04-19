import { type UpdateSubscriptionRequest } from '../clients/update-subscription'

export class AxiosUpdateSubscriberMapper {
  static toPersistence(data: Omit<UpdateSubscriptionRequest, 'clientId'>) {
    return {
      plano: data.planId,
      modulos: data?.modules?.map((item) => ({
        modulo: item.id,
        qtd: item.quantity,
      })),
    }
  }
}
