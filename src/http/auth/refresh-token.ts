import { api } from '@/lib/axios'

import { AxiosRefreshTokenInMapper } from '../mappers/axios-refresh-token-mapper'

interface RefreshTokenRequest {
  refreshToken: string
}

export interface ResfreshTokenResponse {
  token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

export async function refreshToken(data: RefreshTokenRequest) {
  const response = await api.post<ResfreshTokenResponse>(
    '/revendas/auth/refresh',
    {
      refresh_token: data.refreshToken,
    }
  )

  return AxiosRefreshTokenInMapper.toDomain(response.data)
}
