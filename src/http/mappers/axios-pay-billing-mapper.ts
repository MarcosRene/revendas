import { type PayBillingResponse } from '../billing/types'

enum PayBillingStatus {
  PAGA = 'paid',
  PENDENTE = 'pending',
  CANCELADA = 'cancelled',
  ESTORNADA = 'returned',
}

export class AxiosPayBillingMapper {
  static toDomain(data: PayBillingResponse) {
    return {
      id: data.id,
      status: PayBillingStatus[data.status as keyof typeof PayBillingStatus],
      dueDate: data.dataHora,
      value: data.valor,
      description: data.descricao,
      expirationTime: data.tempoExpiracao,
      qrCode: data.linkQRCode,
    }
  }
}
