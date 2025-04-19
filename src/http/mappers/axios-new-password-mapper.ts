import { type NewPasswordRequest } from '../forgot-password/new-password'

export class AxiosNewPassword {
  static toPersistence(data: NewPasswordRequest) {
    return {
      validationCode: data.code,
      novaSenha: data.newPassword,
    }
  }
}
