import { api } from '@/lib/axios'

import { AxiosSignInMapper } from '../mappers/axios-sign-in-mapper'

export interface SignInRequest {
  email: string
  password: string
}

type AuthUser = {
  id: number
  email: string
  nome: string
}

export interface SignInResponse {
  token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: AuthUser
}

export async function signIn(data: SignInRequest) {
  const signInResponse = await api.post<SignInResponse>(
    '/revendas/auth/token',
    AxiosSignInMapper.toPersistence(data)
  )

  return AxiosSignInMapper.toDomain(signInResponse.data)
}
