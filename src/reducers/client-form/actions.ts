export type FormState<T> = T

export type Actions<T> = {
  type: 'SET_FORM_STATE'
  payload: FormState<T>
}
