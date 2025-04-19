import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { refreshToken as refreshTokenAPI } from '@/http/auth'

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: Array<PromiseType> = []
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('@revendas:token')}`,
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const errorMessage = (error.response.data as { errorMessage: string })
        ?.errorMessage

      if (errorMessage === 'Token expired') {
        const originalConfig: InternalAxiosRequestConfig | undefined =
          error.config

        if (!isRefreshing) {
          isRefreshing = true

          const refreshToken = localStorage.getItem('@revendas:refreshToken')

          try {
            if (!refreshToken) return

            const { token, refreshToken: newRefreshToken } =
              await refreshTokenAPI({
                refreshToken,
              })

            localStorage.setItem('@revendas:token', token)
            localStorage.setItem('@revendas:refreshToken', newRefreshToken)

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            failedRequestQueue.forEach((request) => request.onSuccess(token))
            failedRequestQueue = []
          } catch (error) {
            failedRequestQueue.forEach((request) =>
              request.onFailure(error as unknown as AxiosError)
            )
            failedRequestQueue = []
          } finally {
            isRefreshing = false
          }
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              if (!originalConfig) return

              originalConfig.headers['Authorization'] = `Bearer ${token}`
              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      } else {
        localStorage.removeItem('@revendas:token')
        localStorage.removeItem('@revendas:refreshToken')
      }
    }

    return Promise.reject(error)
  }
)
