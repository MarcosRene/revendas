import { type ChangeDetails } from '@/dtos/types'

export interface Billing {
  id: number
  dueDate: string
  status: string
  value: number
  daysOverdue: number
  discount: number
  interest: number
  currentValue: number
  paymentDate: string | null
  paidValue: number
}

export interface BillingRowProps {
  billing: Billing
  selection: number[]
  onSelection: (changes: ChangeDetails, billing: Billing) => void
}
