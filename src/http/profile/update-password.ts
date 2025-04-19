import { api } from '@/lib/axios'

import { AxiosUpdatePassword } from '../mappers/axios-update-password'

export interface UpdatePasswordRequest {
  currentPassword: string
  newPassword: string
}

export async function updatePassword(data: UpdatePasswordRequest) {
  await api.post(
    'revendas/auth/change-password',
    AxiosUpdatePassword.toPersistence(data)
  )
}
