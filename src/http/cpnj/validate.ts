import { api } from '@/lib/axios'

interface ValidateRequest {
  cnpj: string
}

interface ValidateResponse {
  exists: boolean
}

export async function valitate({ cnpj }: ValidateRequest) {
  const response = await api.get<ValidateResponse>(
    `/revendas/consultas/cnpj/${cnpj}/cadastrado`
  )

  return response.data
}
