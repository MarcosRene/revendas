import { createListCollection } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getCities } from '@/http/get-cities'

interface UseCityProps {
  uf?: string
}

export function useGetCities({ uf }: UseCityProps) {
  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities', uf],
    queryFn: () => getCities({ uf }),
    enabled: !!uf,
  })

  const cityList = useMemo(() => {
    return createListCollection({
      items: cities
        ? cities?.map((item) => ({
            label: item.description,
            value: item.description,
          }))
        : [],
    })
  }, [cities])

  return {
    cityList,
    isCitiesLoading,
  }
}
