interface QuantityValues {
  qtdFinal: number
  qtdInicial: number
  valor: number
}

export interface GetModuleResponse {
  id: number
  descricao: string
  detalhes: string
  valor: number
  qtdGratis: number
  linkVideo: string
  permiteQuantidade: boolean
  valoresQuantidade: QuantityValues[]
}

export class AxiosGetModuleMapper {
  static toDomain(data: GetModuleResponse) {
    return {
      id: data.id,
      description: data.descricao,
      details: data.detalhes,
      price: data.valor,
      quantityFree: data.qtdGratis,
      videoUrl: data.linkVideo,
      quantityAllowed: data.permiteQuantidade,
      quantityValues: data.valoresQuantidade.map((feat) => ({
        initialQuantity: feat.qtdInicial,
        finalQuantity: feat.qtdFinal,
        unitPrice: feat.valor,
      })),
    }
  }
}
