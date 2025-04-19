import { useQuery } from '@tanstack/react-query'

import { getPlans } from '@/http/clients/get-plans'

export function usePlans() {
  const { data: plans, isLoading: isPlansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  })

  return {
    plans,
    isPlansLoading,
  }
}
