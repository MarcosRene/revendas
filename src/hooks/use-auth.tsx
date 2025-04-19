import { useContext } from 'react'

import { AuthContext } from '@/contexts/auth/auth-context'

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return authContext
}
