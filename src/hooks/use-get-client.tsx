import { useQuery } from '@tanstack/react-query'

import { getCnpj } from '@/http/cpnj/get-cnpj'

interface UseGetClientProps {
  cnpj: string | undefined
}

export function useGetClient({ cnpj }: UseGetClientProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['get-client'],
    queryFn: () => getCnpj({ cnpj }),
  })

  return {
    client: data,
    isClientLoading: isLoading,
  }
}
