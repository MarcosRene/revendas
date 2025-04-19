import { type BillingResponse } from '../clients/get-billings'

enum BillingStatus {
  'PENDENTE' = 'pending',
  'PAGA' = 'paid',
  'ATRASADA' = 'overdue',
}

export class AxiosGetBillingMapper {
  static toDomain(data: BillingResponse) {
    return {
      id: data.id,
      status: BillingStatus[data.status as keyof typeof BillingStatus],
      dueDate: data.dataVencimento,
      value: data.valor,
      daysOverdue: data.diasAtraso,
      discount: data.valorMulta,
      interest: data.valorJuros,
      currentValue: data.valorAtual,
      paymentDate: data.dataPagamento,
      paidValue: data.valorPago,
    }
  }
}
