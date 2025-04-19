import { Flex, Text } from '@chakra-ui/react'
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from 'react-icons/lu'

import { PaginationItem } from './pagination-item'

interface PaginationProps {
  totalPages: number
  page: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagintion({ totalPages, page, onPageChange }: PaginationProps) {
  return (
    <Flex justifyContent="space-between">
      <Text fontSize="sm" color="zinc.700" fontWeight="medium">
        Página {page} de {totalPages}
      </Text>
      <Flex spaceX={{ base: 6, lg: 8 }}>
        <Flex spaceX="2">
          <PaginationItem
            icon={LuChevronsLeft}
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            <Text srOnly>Primeira página</Text>
          </PaginationItem>

          <PaginationItem
            icon={LuChevronLeft}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <Text srOnly>Página anterior</Text>
          </PaginationItem>

          <PaginationItem
            icon={LuChevronRight}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <Text srOnly>Próxima página</Text>
          </PaginationItem>

          <PaginationItem
            icon={LuChevronsRight}
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
          >
            <Text srOnly>Última página</Text>
          </PaginationItem>
        </Flex>
      </Flex>
    </Flex>
  )
}
