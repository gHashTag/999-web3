'use-client'

import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import IconLogo from './icon-logo'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isTabActive = (path: string) => {
    return pathname === path
  }

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <IconLogo width="40" height="40" backgroundColor="var(--brand)" foregroundColor="black" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isTabActive('/meets')}>
          <Link color={isTabActive('/meets') ? 'primary' : 'foreground'} href="/meets">
            Meets
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isTabActive('/tasks')}>
          <Link color={isTabActive('/tasks') ? 'primary' : 'foreground'} href="/tasks">
            Tasks
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isTabActive('/integrations')}>
          <Link color={isTabActive('/integrations') ? 'primary' : 'foreground'} href="/integrations">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
