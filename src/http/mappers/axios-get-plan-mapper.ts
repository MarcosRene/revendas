type FeatureType = {
  funcionalidade: string
  destacar: boolean
  descricao: string
}

type ColorType = {
  red: number
  green: number
  blue: number
}

export interface GetPlanResponse {
  id: number
  descricao: string
  detalhes: string
  maisVendido: boolean
  linkVideo: string
  qtdMaquinas: number
  valor: number
  funcionalidades: FeatureType[]
  cor: ColorType
}

export class AxiosGetPlanMapper {
  static toDomain(data: GetPlanResponse) {
    return {
      id: data.id,
      description: data.descricao,
      details: data.detalhes,
      bestsellers: data.maisVendido,
      videoUrl: data.linkVideo,
      quantityOfMachines: data.qtdMaquinas,
      price: data.valor,
      features: data.funcionalidades.map((feat) => ({
        feature: feat.funcionalidade,
        highlight: feat.destacar,
        description: feat.descricao,
      })),
      color: data.cor,
    }
  }
}
