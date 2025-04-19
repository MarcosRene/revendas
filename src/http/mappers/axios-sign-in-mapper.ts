import { type SignInRequest, type SignInResponse } from '../auth/sign-in'

export class AxiosSignInMapper {
  static toDomain(data: SignInResponse) {
    return {
      token: data.token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.nome,
      },
    }
  }

  static toPersistence(data: SignInRequest) {
    return {
      email: data.email,
      senha: data.password,
    }
  }
}
