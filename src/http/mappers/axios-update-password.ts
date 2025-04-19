import { type UpdatePasswordRequest } from '../profile/update-password'

export class AxiosUpdatePassword {
  static toPersistence(data: UpdatePasswordRequest) {
    return {
      senhaAtual: data.currentPassword,
      novaSenha: data.newPassword,
    }
  }
}
