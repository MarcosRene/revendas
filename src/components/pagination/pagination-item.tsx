import { type ElementType } from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'

interface PaginationItemProps extends ButtonProps {
  icon: ElementType
}

export function PaginationItem({ icon: Icon, ...props }: PaginationItemProps) {
  return (
    <Button variant="outline" size="xs" padding="0" {...props}>
      <Icon />
    </Button>
  )
}
