import { createContext } from 'react'

export type AuthCredentials = {
  email: string
  password: string
}

export type AuthUser = {
  id: number
  email: string
  name: string
  cnpj: string
}

export interface AuthContextProps {
  isAuthenticated: boolean
  isAuthenticating: boolean
  isLoggingOut: boolean
  signIn: (credentials: AuthCredentials) => void
  signOut: () => Promise<void>
  token: string | null
  refreshToken: string | null
  user?: AuthUser | null
}

export const AuthContext = createContext<AuthContextProps | null>(null)
