import { api } from '@/lib/axios'

import { AxiosGetClientMapper } from '../mappers/axios-get-clients-mapper'
import { AxiosNormalizedClientParams } from '../mappers/axios-normalized-client-params'

export type GetClientParams = Partial<{
  limit: number
  page: number
  category: {
    field: string
    value: string
  }
  creationStartDate: string
  creationEndDate: string
  dueDateStart: string
  dueDateEnd: string
  blockStartDate: string
  blockEndDate: string
  dueDay: string
  blocked: string
  blockedType: string
  billingStatus: string
  planIds: string
  moduleIds: string
}>

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

export interface GetClientResponse {
  count: number
  data: {
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
  }[]
  hasMore: boolean
  limit: number
  page: number
  totalCount: number
  totalPages: number
}

function getNormalizedParams(params: GetClientParams) {
  const normalizedParams = new URLSearchParams()

  Object.entries(AxiosNormalizedClientParams.toPersistence(params)).forEach(
    ([key, value]) => {
      if (value !== undefined && value !== '') {
        normalizedParams.set(key, value.toString())
      }
    }
  )

  return normalizedParams
}

export async function getClients(params: GetClientParams) {
  const normalizedParams = getNormalizedParams(params)

  const response = await api.get<GetClientResponse>('/revendas/clientes', {
    headers: {
      'X-Paginate': 'true',
    },
    params: normalizedParams,
  })

  return {
    count: response.data.count,
    data: response.data.data.map(AxiosGetClientMapper.toDomain),
    hasMore: response.data.hasMore,
    limit: response.data.limit,
    page: response.data.page,
    totalCount: response.data.totalCount,
    totalPages: response.data.totalPages,
  }
}
