import { type ResfreshTokenResponse } from '../auth/refresh-token'

export class AxiosRefreshTokenInMapper {
  static toDomain(data: ResfreshTokenResponse) {
    return {
      token: data.token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
    }
  }
}
