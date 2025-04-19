import { useQuery } from '@tanstack/react-query'

import { getClientById } from '@/http/clients/get-client-by-id'

interface UseGetClientDetailsProps {
  clientId: string | undefined
}

export function useGetClientDetails({ clientId }: UseGetClientDetailsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClientById({ clientId }),
  })

  return { details: data, isClientLoading: isLoading }
}
