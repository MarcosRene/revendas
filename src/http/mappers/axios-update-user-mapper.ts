import { type UserResponse } from '../profile/get-user'
import { type UpdateUserRequest } from '../profile/update-user'

type AxiosUpdateUserMapperRequest = Omit<UserResponse, 'inscEstadual'> & {
  inscricaoEstadual: string
}

export class AxiosUpdateUserMapper {
  static toDomain(data: AxiosUpdateUserMapperRequest) {
    return {
      id: data.id,
      name: data.razaoSocial,
      description: data.descricao,
      responsibleName: data.nomeResponsavel,
      ie: data.inscricaoEstadual,
      email: data.email,
      phone: data.telefoneCentral,
      cell: data.celularSuporte,
      address: {
        state: data.estado,
        city: data.cidade,
        neighborhood: data.bairro,
        street: data.endereco,
        number: data.numero,
        complement: data.complemento,
        zipCode: data.cep,
      },
      instagram: data.instagram,
    }
  }

  static toPersistence(data: UpdateUserRequest) {
    return {
      razaoSocial: data.name,
      descricao: data.description,
      nomeResponsavel: data.responsibleName,
      inscEstadual: data.ie,
      email: data.email,
      telefoneCentral: data.phone,
      celularSuporte: data.cell,
      estado: data.address.state,
      cidade: data.address.city,
      bairro: data.address.neighborhood,
      endereco: data.address.street,
      numero: data.address.number,
      complemento: data.address.complement,
      cep: data.address.zipCode,
      instagram: data.instagram,
    }
  }
}
