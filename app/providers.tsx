// app/providers.tsx
'use client'
import { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { authenticateUser, initWeb3Auth, subscribeToEvents } from '@/utils/auth'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'

export function Providers({ children }: { children: React.ReactNode }) {
    const { setLoggedIn } = useWeb3Auth()

  useEffect(() => {
    initWeb3Auth()
    const unsubscribe = subscribeToEvents(async () => {
      await authenticateUser()
        setLoggedIn(true)
    })
    return unsubscribe
  }, [])

  return <NextUIProvider>{children}</NextUIProvider>
}
