import { type CityReponse } from '../get-cities'

export class AxiosCityMapper {
  static toDomain(data: CityReponse) {
    return {
      description: data.descricao,
      code: data.codigoIBGE,
      state: data.uf,
    }
  }
}
