import { api } from '@/lib/axios'

import { AxiosNewPassword } from '../mappers/axios-new-password-mapper'

export interface NewPasswordRequest {
  code: string
  newPassword: string
}

export async function newPassword(data: NewPasswordRequest) {
  await api.post(
    '/revendas/auth/reset-password',
    AxiosNewPassword.toPersistence(data)
  )
}
