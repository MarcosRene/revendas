export interface QuantityValue {
  initialQuantity: number
  finalQuantity: number
  unitPrice: number
}

export type ModuleItemType = {
  [key: number]: { unitPrice: number; totalUnitPrice: number }
}

export type QuantitiesType = {
  [key: number]: number
}

export interface Module {
  id: number
  description: string
  details: string
  price: number
  quantityFree: number
  videoUrl: string
  quantityAllowed: boolean
  quantityValues: {
    initialQuantity: number
    finalQuantity: number
    unitPrice: number
  }[]
}
