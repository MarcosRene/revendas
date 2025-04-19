export interface PayBillingResponse {
  id: string
  status: string
  dataHora: string
  valor: number
  descricao: string
  tempoExpiracao: number
  linkQRCode: string
}
