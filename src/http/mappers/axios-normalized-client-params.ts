/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GetClientParams } from '../clients/get-clients'

export class AxiosNormalizedClientParams {
  static toPersistence(params: GetClientParams) {
    const {
      category,
      dueDay,
      blocked,
      blockedType,
      billingStatus,
      planIds,
      moduleIds,
      creationStartDate,
      creationEndDate,
      dueDateStart,
      dueDateEnd,
      blockStartDate,
      blockEndDate,
      limit,
      page,
    } = params

    const persistentParams: Record<string, any> = {
      limit,
      page,
      dataInicialCadastro: creationStartDate,
      dataFinalCadastro: creationEndDate,
      dataInicialVencimento: dueDateStart,
      dataFinalVencimento: dueDateEnd,
      dataInicialBloqueio: blockStartDate,
      dataFinalBloqueio: blockEndDate,
      diaVencimento: dueDay,
      bloqueado: blocked,
      tipoBloqueio: blockedType,
      statusCobranca: billingStatus,
      planos: planIds,
      modulos: moduleIds,
    }

    if (category) {
      persistentParams[category.field] = category.value
    }

    return persistentParams
  }
}
