import { api } from '@/lib/axios'

export interface UnblockClientRequest {
  clientId?: string
}

export async function unblockClient({ clientId }: UnblockClientRequest) {
  await api.post(`/revendas/clientes/${clientId}/desbloquear`)
}
