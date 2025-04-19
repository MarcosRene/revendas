type Address = {
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string | null
  zipCode: string
}

export interface FormData {
  name: string
  address: Address
  description: string
  responsibleName: string
  phone: string
  cell: string
  email: string
  ie: string | null
}

export interface ChangeDetails {
  checked: boolean | 'indeterminate'
}

export type Module = {
  id: number
  quantity: number
}

type Feature = {
  feature: string
  highlight: boolean
  description: string
}

type Color = {
  red: number
  green: number
  blue: number
}

export interface Plan {
  id: number
  description: string
  details: string
  bestsellers: boolean
  videoUrl: string
  quantityOfMachines: number
  price: number
  features: Feature[]
  color: Color
}

export type ClientFormStateProps = Partial<{
  plan: Plan | null
  modules: Module[]
}>
