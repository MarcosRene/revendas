import { type GetClientResponse } from '../clients/get-clients'

enum BlockType {
  'FALTA_PAGTO' = 'payment',
  'REVENDA' = 'resale',
}

enum BillingStatus {
  'PENDENTE' = 'pending',
  'PAGA' = 'paid',
  'ATRASADA' = 'overdue',
}

export class AxiosGetClientMapper {
  static toDomain(data: GetClientResponse['data'][number]) {
    return {
      id: data.id,
      active: data.ativo,
      cnpj: data.cnpj,
      name: data.razaoSocial,
      description: data.nomeFantasia,
      ie: data.inscricaoEstadual,
      im: data.inscricaoMunicipal,
      email: data.email,
      phone: data.telefone,
      cell: data.celular,
      address: {
        city: data.cidade,
        state: data.estado,
        street: data.endereco,
        number: data.numero,
        complement: data.complemento,
        zipCode: data.cep,
        ibgeCode: data.codigoIBGE,
        neighborhood: data.bairro,
      },
      responsibleName: data.nomeResponsavel,
      responsiblePhone: data.telefoneResponsavel,
      segment: {
        id: data.segmento.id,
        description: data.segmento.descricao,
      },
      blocked: data.bloqueado,
      blockDetails: {
        blockDate: data.dadosBloqueio?.dataBloquear,
        blockAt: data.dadosBloqueio?.dataHoraBloqueio,
        clientMessage: data.dadosBloqueio?.mensagemCliente,
        blockReason: data.dadosBloqueio?.motivoBloqueio,
        blockType:
          BlockType[data.dadosBloqueio?.tipoBloqueio as keyof typeof BlockType],
      },
      billing: {
        id: data.cobranca?.id,
        status:
          BillingStatus[data.cobranca?.status as keyof typeof BillingStatus],
        dueDate: data.cobranca?.dataVencimento,
        value: data.cobranca?.valor,
        daysOverdue: data.cobranca?.diasAtraso,
        discount: data.cobranca?.valorMulta,
        interest: data.cobranca?.valorJuros,
        currentValue: data.cobranca?.valorAtual,
        paymentDate: data.cobranca?.dataPagamento,
        paidValue: data.cobranca?.valorPago,
      },
      plan: {
        id: data.plano?.id,
        description: data.plano?.descricao,
        value: data.plano?.valor,
        quantity: data.plano?.qtdMaquinas,
      },
      modules: data.modulos.map((module) => ({
        id: module.id,
        description: module.descricao,
        totalPaid: module.qtdPaga,
        freeQuantity: module.qtdGratis,
        totalQuantity: module.qtdTotal,
        unitValue: module.valorUnit,
        totalValue: module.valorTotal,
      })),
      openBillingDueDate: data.dataVencimentoCobrancaEmAberto,
      licenseExpirationDate: data.dataValidadeLicenca,
      createdAt: data.dataCadastro,
    }
  }
}
