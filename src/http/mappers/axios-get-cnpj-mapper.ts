import { type GetCnpjReponse } from '../cpnj/get-cnpj'

export class AxiosGetCnpjMapper {
  static toDomain(data: GetCnpjReponse) {
    return {
      name: data.razaoSocial,
      description: data.nomeFantasia,
      ie: data.inscricaoEstadual,
      im: data.inscricaoMunicipal,
      email: data.email,
      phone: data.telefone,
      cell: data.celular,
      address: {
        state: data.estado,
        city: data.cidade,
        neighborhood: data.bairro,
        street: data.endereco,
        number: data.numero,
        complement: data.complemento,
        zipCode: data.cep,
      },
    }
  }
}
