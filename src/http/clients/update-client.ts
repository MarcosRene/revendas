import { api } from '@/lib/axios'

import { AxiosCreateClientMapper } from '../mappers/axios-create-client-mapper'

interface UpdateClientRequest {
  clientId?: string
  cnpj?: string
  name: string
  description: string
  responsibleName: string
  responsiblePhone: string
  ie?: string
  im?: string
  email: string
  phone: string
  cell: string
  address: {
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
    zipCode: string
  }
  segment: number
}

type Segmento = {
  id: number
  descricao: string
}

type Billing = {
  id: number
  status: string
  dataVencimento: string
  valor: number
  diasAtraso: number
  valorMulta: number
  valorJuros: number
  valorAtual: number
  dataPagamento: string | null
  valorPago: number
}

type Plan = {
  id: number
  descricao: string
  valor: number
  qtdMaquinas: number
}

type Module = {
  id: number
  descricao: string
  qtdPaga: number
  qtdGratis: number
  qtdTotal: number
  valorUnit: number
  valorTotal: number
}

type Blocked = {
  dataBloquear: string
  dataHoraBloqueio: string
  mensagemCliente: string
  motivoBloqueio: string
  tipoBloqueio: string
}

export interface UpdateClientResponse {
  id: number
  ativo: boolean
  dataCadastro: string
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  inscricaoEstadual: string
  inscricaoMunicipal: string
  email: string
  telefone: string
  celular: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cep: string
  codigoIBGE: number
  cidade: string
  estado: string
  nomeResponsavel: string
  telefoneResponsavel: string
  segmento: Segmento
  dataVencimentoCobrancaEmAberto: string | null
  dataValidadeLicenca: string | null
  bloqueado: boolean
  dadosBloqueio: Blocked | null
  cobranca: Billing | null
  plano: Plan | null
  modulos: Module[] | []
  valorAssinatura: number
}

export async function updateClient({ clientId, ...data }: UpdateClientRequest) {
  const response = await api.put<UpdateClientResponse>(
    `/revendas/clientes/${clientId}`,
    AxiosCreateClientMapper.toPersistence(data)
  )

  return AxiosCreateClientMapper.toDomain(response.data)
}
