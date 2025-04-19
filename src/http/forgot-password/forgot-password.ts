import { api } from '@/lib/axios'

interface ForgotPasswordRequest {
  email: string
}

interface ForgotPasswordResponse {
  validationCode: string
}

export async function forgotPassword({ email }: ForgotPasswordRequest) {
  const response = await api.post<ForgotPasswordResponse>(
    '/revendas/auth/forgot-password',
    {
      email,
    }
  )

  return response.data
}
