import { createListCollection } from '@chakra-ui/react'

export const limitPerPageList = createListCollection({
  items: [
    ...Array.from({ length: 5 }, (_, index) => ({
      label: String((index + 1) * 5),
      value: String((index + 1) * 5),
    })),
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '150', value: '150' },
    { label: '200', value: '200' },
  ],
})

export const categoryList = createListCollection({
  items: [
    { label: 'CPF', value: 'cpf' },
    { label: 'CNPJ', value: 'cnpj' },
    { label: 'Razão social', value: 'razaoSocial' },
    { label: 'Nome Fantasia', value: 'nomeFantasia' },
  ],
})

export const blockedList = createListCollection({
  items: [
    { label: 'Selecione o status de bloqueio', value: '' },
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ],
})

export const blockedTypeList = createListCollection({
  items: [
    { label: 'Selecione o tipo do bloqueio', value: '' },
    { label: 'Revenda', value: 'REVENDA' },
    { label: 'Falta de pagamento', value: 'FALTA_PAGTO' },
  ],
})

export const billingTypeList = createListCollection({
  items: [
    {
      label: 'Selecione um status de cobrança',
      value: '',
    },
    { label: 'Pendentes', value: 'PENDENTE' },
    { label: 'Atrasadas', value: 'ATRASADA' },
  ],
})
