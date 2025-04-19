import { api } from '@/lib/axios'

export interface RegisterPaymentRequest {
  pixId: string
}

export async function registerPayment({ pixId }: RegisterPaymentRequest) {
  await api.post(`/revendas/cobrancas/pix/${pixId}/pagamento`)
}
