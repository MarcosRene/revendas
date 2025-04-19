import { useMutation } from '@tanstack/react-query'
import { type ReactNode, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { toaster } from '@/components/ui/toaster'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { revokeToken, signIn } from '@/http/auth'
import { api } from '@/lib/axios'
import { errorHandler } from '@/utils/error-handler'

import { AuthContext, type AuthContextProps } from './auth-context'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()

  const { setLocalStorage, getLocalStorage, removeLocalStorage } =
    useLocalStorage()

  const getInitialAuthState = useCallback(() => {
    const token = getLocalStorage<AuthContextProps['token']>('token')
    const refreshToken =
      getLocalStorage<AuthContextProps['refreshToken']>('refreshToken')
    const currentUser = getLocalStorage<AuthContextProps['user']>('user')

    if (token && refreshToken && currentUser) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      return {
        token,
        refreshToken,
        isAuthenticated: true,
        user: currentUser,
      }
    }

    return {
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      user: null,
    }
  }, [getLocalStorage])

  const [authState, setAuthState] = useState<
    Pick<
      AuthContextProps,
      'token' | 'refreshToken' | 'isAuthenticated' | 'user'
    >
  >(getInitialAuthState())

  const { mutateAsync: signInFn, isPending: isAuthenticating } = useMutation({
    mutationFn: signIn,
    onSuccess: ({ token, refreshToken, user }) => {
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      setLocalStorage('token', token)
      setLocalStorage('refreshToken', refreshToken)
      setLocalStorage('user', user)

      setAuthState({
        token,
        refreshToken,
        isAuthenticated: true,
        user,
      })

      navigate('/clients', { replace: true })
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })

      setAuthState({
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        user: null,
      })
    },
  })

  const { mutateAsync: signOutFn, isPending: isLoggingOut } = useMutation({
    mutationFn: () => revokeToken({ refreshToken: authState.refreshToken }),
    onSuccess: () => {
      removeLocalStorage('token')
      removeLocalStorage('refreshToken')
      removeLocalStorage('user')

      setAuthState({
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        user: null,
      })

      navigate('/sign-in', { replace: true })
    },
    onError: (error) => {
      toaster.error({
        title: errorHandler(error),
      })

      setAuthState({
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        user: null,
      })
    },
  })

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isAuthenticating,
        isLoggingOut,
        signIn: signInFn,
        signOut: signOutFn,
        token: authState.token,
        refreshToken: authState.refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
