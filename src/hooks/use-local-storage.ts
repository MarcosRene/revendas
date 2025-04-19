import { useCallback } from 'react'

export function useLocalStorage() {
  function formatKey(key: string) {
    return `@revendas:${key}`
  }

  const setLocalStorage = useCallback(<T>(key: string, value?: T) => {
    if (value === undefined) {
      return
    }

    localStorage.setItem(formatKey(key), JSON.stringify(value))
  }, [])

  const getLocalStorage = useCallback(<T>(key: string): T | null => {
    const value = localStorage.getItem(formatKey(key))

    if (!value) return null

    return JSON.parse(value)
  }, [])

  const removeLocalStorage = useCallback((key: string) => {
    localStorage.removeItem(formatKey(key))
  }, [])

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
  }
}
