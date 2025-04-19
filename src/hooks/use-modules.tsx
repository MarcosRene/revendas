import { useQuery } from '@tanstack/react-query'

import { getModules } from '@/http/clients/get-modules'

export function useModules() {
  const { data: modules, isLoading: isModulesLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: getModules,
  })

  return {
    modules,
    isModulesLoading,
  }
}
