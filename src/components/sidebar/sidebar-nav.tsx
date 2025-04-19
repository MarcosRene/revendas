import {
  Box,
  Collapsible,
  Float,
  Image,
  List,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiBriefcase, FiChevronRight, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router'

import logo2x2Cilos from '@/assets/images/logo2x2.svg'

import { NavItem } from './nav-item'
import { UserProfile } from './user-profile'

export function SidebarNav() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  return (
    <Stack
      width={{ base: 'auto', lg: 'max-sidebar-width' }}
      align="flex-start"
      borderRightColor="zinc.200"
      borderRightWidth={{ base: 'none', lg: 'thin' }}
      paddingY="6"
      paddingX="4"
      height="full"
      backgroundColor="white"
    >
      <Box>
        <Stack spaceY="8">
          <Link to="/clients">
            <Image
              src={logo2x2Cilos}
              alt="Logo Ciclos"
              aspectRatio="13 / 2"
              height="auto"
              objectFit="contain"
            />
          </Link>

          <Text paddingX="3" fontSize="md" fontWeight="bold">
            Geral
          </Text>
        </Stack>

        <List.Root marginY="4" spaceY="2">
          <NavItem icon={FiUsers} title="Clientes" path="/clients" />

          <Collapsible.Root
            open={isCollapsibleOpen}
            onOpenChange={({ open }) => setIsCollapsibleOpen(open)}
          >
            <Collapsible.Trigger
              width="full"
              display="flex"
              alignItems="center"
              gap="3"
              color="zinc.700"
              paddingY="2.5"
              paddingX="3"
              borderRadius="sm"
              transitionProperty={['background', 'colors']}
              transitionDuration="slow"
              transitionTimingFunction="ease-in-out"
              cursor="pointer"
              _hover={{
                backgroundColor: 'zinc.100',
              }}
              position="relative"
            >
              <FiBriefcase size="1.125rem" />
              <Text fontWeight="lighter">Minha empresa</Text>

              <Float
                placement="middle-end"
                offset="5"
                transition="rotate"
                transitionDuration="0.2s"
                transformOrigin="center center"
                rotate={isCollapsibleOpen ? '90deg' : '0deg'}
              >
                <FiChevronRight size="1.125rem" />
              </Float>
            </Collapsible.Trigger>
            <Collapsible.Content
              display="flex"
              flexDirection="column"
              gap="2"
              paddingLeft="2.125rem"
              paddingY="2"
            >
              <NavItem
                title="Meus dados"
                path="/profile"
                paddingY="1.5"
                paddingX="2"
              />
              <NavItem
                title="Configurações"
                path="/settings"
                paddingY="1.5"
                paddingX="2"
              />
            </Collapsible.Content>
          </Collapsible.Root>
        </List.Root>
      </Box>

      <Box spaceY="6" marginTop="auto">
        <Separator borderColor="zinc.200" />
        <UserProfile />
      </Box>
    </Stack>
  )
}
