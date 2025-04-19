import { type ReactNode, useCallback, useMemo, useReducer } from 'react'

import { clientFormReducer } from '@/reducers/client-form/reducer'

import {
  ClientFormContext,
  type ClientFormContextProps,
} from './client-form-context'

type ClientFormProviderProps<T> = {
  children: ReactNode
  initialFormState?: T
}

export function ClientFormProvider<T>({
  children,
  initialFormState,
}: ClientFormProviderProps<T>) {
  const [state, dispatch] = useReducer(clientFormReducer<T>, {
    formState: initialFormState || ({} as T),
  })

  const setFormState = useCallback((formState: T) => {
    dispatch({ type: 'SET_FORM_STATE', payload: formState })
  }, [])

  const values = useMemo(() => {
    return {
      formState: state.formState,
      setFormState,
    }
  }, [state, setFormState]) as ClientFormContextProps<unknown>

  return (
    <ClientFormContext.Provider value={values}>
      {children}
    </ClientFormContext.Provider>
  )
}
