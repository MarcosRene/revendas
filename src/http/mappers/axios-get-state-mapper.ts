import { type StateResponse } from '../get-states'

export class AxiosStateMapper {
  static toDomain(data: StateResponse) {
    return {
      description: data.descricao,
      code: data.codigo,
      state: data.uf,
    }
  }
}
