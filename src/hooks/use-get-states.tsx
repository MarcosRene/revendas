import { createListCollection } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { getStates } from '@/http/get-states'

export function useGetStates() {
  const { data: states } = useQuery({
    queryKey: ['states'],
    queryFn: getStates,
  })

  const stateList = useMemo(() => {
    return createListCollection({
      items: states
        ? states?.map((item) => ({
            label: item.description,
            value: item.state,
          }))
        : [],
    })
  }, [states])

  return {
    stateList,
  }
}
