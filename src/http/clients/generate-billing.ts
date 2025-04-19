import { api } from '@/lib/axios'

interface GenerateBillingRequest {
  clientId?: string
  quantity: string
}

export async function generateBilling({
  clientId,
  quantity,
}: GenerateBillingRequest) {
  await api.post(`/revendas/clientes/${clientId}/cobrancas/${quantity}`)
}
