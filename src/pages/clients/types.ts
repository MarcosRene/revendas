import { type ChangeDetails } from '@/dtos/types'

type Address = {
  city: string
  state: string
  street: string
  number: string
  complement: string
  zipCode: string
  ibgeCode: number
  neighborhood: string
}

type Segmento = {
  id: number
  description: string
}

type BlockedDetails = {
  blockDate: string
  blockAt: string
  clientMessage: string
  blockReason: string
  blockType: string
}

type Billing = {
  id: number
  status: string
  dueDate: string
  value: number
  daysOverdue: number
  discount: number
  interest: number
  currentValue: number
  paymentDate: string
  paidValue: number
}

type Plan = {
  id: number
  description: string
  value: number
  quantity: number
}

type Module = {
  id: number
  description: string
  quantity: number
  freeQuantity: number
  totalQuantity: number
  unitValue: number
  totalValue: number
}

export interface ClientProps {
  id: number
  active: boolean
  cnpj: string
  name: string
  description: string
  ie: string
  im: string
  email: string
  phone: string
  cell: string
  address: Address
  responsibleName: string
  responsiblePhone: string
  segment: Segmento
  blocked: boolean
  blockDetails: BlockedDetails | null
  billing: Billing | null
  plan: Plan | null
  modules: Module[] | []
  openBillingDueDate: string | null
  licenseExpirationDate: string
  createdAt: string
}

export interface ClientRowProps {
  client: ClientProps
  selection: number[]
  onSelection: (changes: ChangeDetails, client: ClientProps) => void
}
