import { api } from '@/lib/axios'

import { AxiosGetBillingMapper } from '../mappers/axios-get-billing-mapper'

interface GetBillingsRequest {
  clientId?: string
  status?: string
  startDateDue?: string
}

export interface BillingResponse {
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
export interface GetBillingsResponse {
  data: BillingResponse[]
}

export async function getBillings({
  clientId,
  status,
  startDateDue,
}: GetBillingsRequest) {
  const response = await api.get<GetBillingsResponse>(
    `/revendas/clientes/${clientId}/cobrancas?limit=${12}`,
    {
      headers: {
        'X-Paginate': 'true',
      },
      params: { status, dataInicialVencimento: startDateDue },
    }
  )

  const billings = response.data.data

  return billings.map(AxiosGetBillingMapper.toDomain)
}
