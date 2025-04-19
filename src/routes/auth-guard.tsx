import { Presence } from '@chakra-ui/react'
import { type ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router'

import { PulseLoader } from '@/components/pulse-loader'
import { useAuth } from '@/hooks/use-auth'

interface WithAuthGuardOptions {
  isPrivate?: boolean
}

export function withAuthGuard<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthGuardOptions = {}
): ComponentType<P> {
  const { isPrivate = false } = options

  const ComponentWithAuthGuard = (props: P) => {
    const location = useLocation()
    const { isAuthenticated, isAuthenticating, isLoggingOut } = useAuth()

    if (isAuthenticating || isLoggingOut) {
      return <PulseLoader />
    }

    if (isPrivate && !isAuthenticated) {
      return (
        <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
      )
    }

    if (!isPrivate && isAuthenticated) {
      return (
        <Navigate to="/clients" replace state={{ from: location.pathname }} />
      )
    }

    return (
      <Presence
        unmountOnExit
        present
        animationName={{ _open: 'fade-in', _closed: 'fade-out' }}
        animationDuration="moderate"
      >
        <WrappedComponent {...props} />
      </Presence>
    )
  }

  return ComponentWithAuthGuard
}
