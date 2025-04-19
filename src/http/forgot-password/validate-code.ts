import { api } from '@/lib/axios'

interface ValidationCodeRequest {
  code: string
}

interface ValidationCodeResponse {
  id: number
  email: string
}

export async function validateCode({ code }: ValidationCodeRequest) {
  const response = await api.get<ValidationCodeResponse>(
    `/revendas/auth/validate-code/${code}`
  )

  return response.data
}
