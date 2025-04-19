import { type ActiveClientRequest } from '../clients/active-client'

export class AxiosActiveClientMapper {
  static toPersistence(data: Omit<ActiveClientRequest, 'cliendId'>) {
    return {
      plano: data.planId,
      modulos: data.modules.map((module) => ({
        modulo: module.id,
        qtd: module.quantity,
      })),
    }
  }
}
