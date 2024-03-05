'use-client'

import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import IconLogo from './icon-logo'
import { usePathname } from 'next/navigation'
import DropdownMenuApp from './dropdown'
import useDeviceDetect from '@/hooks/useDeviceDetect'

export default function Header() {
  const { isMobile, isTablet } = useDeviceDetect()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const pathname = usePathname()

  const isTabActive = (path: string) => {
    return pathname === path
  }

  const handleLogoClick = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <Navbar shouldHideOnScroll>
      {!isMobile && <IconLogo width="40" height="40" backgroundColor="var(--brand)" foregroundColor="black" />}
      {isMobile && (
        <NavbarBrand>
          <div onClick={handleLogoClick}>
            <DropdownMenuApp />
          </div>
        </NavbarBrand>
      )}
      <div style={{ padding: '20px' }} />
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
