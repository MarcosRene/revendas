import { AxiosError } from 'axios'

export function errorHandler(error: string | unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data.errorMessage
  }

  return error
}
