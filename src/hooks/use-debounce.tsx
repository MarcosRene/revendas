import { useEffect, useState } from 'react'

interface UseDebounceProps {
  value: string
  delay?: number
}

export function useDebounce({ value, delay }: UseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
