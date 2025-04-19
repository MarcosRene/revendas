import { useContext } from 'react'

import {
  ClientFormContext,
  type ClientFormContextProps,
} from '@/contexts/client-form/client-form-context'

export function useClientForm<T>() {
  const clientFormContext = useContext(ClientFormContext)

  if (!clientFormContext) {
    throw new Error('useClientForm must be used within a ClientFormProvider')
  }

  return clientFormContext as ClientFormContextProps<T>
}
