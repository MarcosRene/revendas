import { type BlockClientRequest } from '../clients/block-client'

export class AxiosBlockClientMapper {
  static toPersistence(data: Omit<BlockClientRequest, 'clientId'>) {
    return {
      tipoBloqueio: data.blockType,
      dataBloquear: data.blockDate,
      motivoBloqueio: data.blockReason,
      mensagemCliente: data.clientMessage,
    }
  }
}
