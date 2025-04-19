import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { formatTimerShort } from '@/utils/dayjs'

interface TimerProps {
  status?: string
  seconds: number
  onExpire?: () => void
}

export function Timer({ status, seconds, onExpire = () => {} }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(seconds)

  const currentStatus = ['paid', 'cancelled']

  useEffect(() => {
    if (status && currentStatus.includes(status)) {
      return
    }

    if (seconds === 0) {
      setRemainingTime(0)
      return
    }

    setRemainingTime(seconds)

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId)
          onExpire()
          return 0
        }

        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [status, seconds, onExpire])

  return (
    <Text fontSize="sm" color="zinc.800">
      Tempo restante: {formatTimerShort(remainingTime)} minutos
    </Text>
  )
}
