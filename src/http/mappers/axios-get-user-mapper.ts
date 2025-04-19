import { type UserResponse } from '../profile/get-user'

export class AxiosGetUserMapper {
  static toDomain(data: UserResponse) {
    return {
      id: data.id,
      active: data.ativo,
      name: data.razaoSocial,
      description: data.descricao,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.telefoneCentral,
      cell: data.celularSuporte,
      instagram: data.instagram,
      ie: data.inscEstadual,
      address: {
        street: data.endereco,
        number: data.numero,
        complement: data.complemento,
        neighborhood: data.bairro,
        city: data.cidade,
        state: data.estado,
        zipCode: data.cep,
      },
      responsibleName: data.nomeResponsavel,
    }
  }
}
