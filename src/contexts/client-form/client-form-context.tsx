import { createContext } from 'react'

export interface ClientFormContextProps<T = unknown> {
  formState: T
  setFormState: (formState: T) => void
}

export const ClientFormContext =
  createContext<ClientFormContextProps<unknown> | null>(null)
