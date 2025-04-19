import { type Actions, type FormState } from './actions'

export type ClientFormState<T> = {
  formState: FormState<T>
}

export function clientFormReducer<T>(
  state: ClientFormState<T>,
  action: Actions<T>
): ClientFormState<T> {
  switch (action.type) {
    case 'SET_FORM_STATE':
      return {
        ...state,
        formState: { ...state.formState, ...action.payload },
      }

    default:
      return state
  }
}
