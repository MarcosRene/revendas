import { Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router'

import { SidebarNav } from '@/components/sidebar/sidebar-nav'
import { CloseButton } from '@/components/ui/close-button'
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer'

export function Sidebar() {
  const { open, onToggle, onClose } = useDisclosure()
  const location = useLocation()

  const isLassThen1200px = useBreakpointValue({
    base: true,
    lg: false,
  })

  useEffect(() => {
    onClose()
  }, [location.pathname])

  if (isLassThen1200px) {
    return (
      <DrawerRoot open={open} onOpenChange={onToggle} placement="start">
        <DrawerBackdrop />
        <DrawerTrigger
          borderBottomWidth="thin"
          borderBottomColor="zinc.200"
          asChild
        >
          <Flex padding="3">
            <CloseButton size="sm">
              <FiMenu />
            </CloseButton>
          </Flex>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerBody padding="0">
            <SidebarNav />
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    )
  }

  return <SidebarNav />
}
