export type DetailsParams = {
  id: string | undefined
}

interface CustomerProps {
  clientId?: string
}

export type BlockCustomerProps = CustomerProps

export type UnblockCustomerProps = CustomerProps

export type DocumentMap = Record<number, { label: string; value?: string }>
