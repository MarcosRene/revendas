import { api } from '@/lib/axios'

export interface SignOutRequest {
  refreshToken: string | null
}

export async function revokeToken(data: SignOutRequest) {
  await api.delete('/revendas/auth/refresh', {
    data: {
      refresh_token: data.refreshToken,
    },
  })
}
