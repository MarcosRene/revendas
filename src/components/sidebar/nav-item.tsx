import { List, type ListItemProps, Text } from '@chakra-ui/react'
import React, { cloneElement, type ReactElement } from 'react'
import { type IconBaseProps } from 'react-icons'
import { useLocation } from 'react-router'
import { NavLink, type NavLinkProps } from 'react-router'

interface NavItemLinkProps extends NavLinkProps {
  children: ReactElement
  isActive?: boolean
  shouldMatchExectHref?: boolean
}

interface NavItemProps extends ListItemProps {
  icon?: React.ComponentType<IconBaseProps>
  title: string
  path: string
}

function NavItemLink({
  children,
  shouldMatchExectHref = false,
  ...rest
}: NavItemLinkProps) {
  const { pathname } = useLocation()
  let isActiveLink = false

  if (shouldMatchExectHref && pathname === rest.to.toString()) {
    isActiveLink = true
  }

  if (shouldMatchExectHref && pathname.startsWith(rest.to.toString())) {
    isActiveLink = true
  }

  return (
    <NavLink {...rest}>
      {cloneElement(children, {
        backgroundColor: isActiveLink && 'zinc.100',
      })}
    </NavLink>
  )
}

export function NavItem({ icon: Icon, title, path, ...rest }: NavItemProps) {
  return (
    <NavItemLink to={path} shouldMatchExectHref>
      <List.Item
        display="flex"
        alignItems="center"
        gap="4"
        color="zinc.700"
        paddingY="2.5"
        paddingX="3"
        borderRadius="sm"
        transitionProperty={['background', 'colors']}
        transitionDuration="slow"
        transitionTimingFunction="ease-in-out"
        _hover={{
          backgroundColor: 'zinc.100',
        }}
        {...rest}
      >
        {!!Icon && <Icon size="1.125rem" />}
        <Text>{title}</Text>
      </List.Item>
    </NavItemLink>
  )
}
