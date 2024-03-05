'use client'

import { useState } from 'react'
import { IProvider } from '@web3auth/base'
import { web3auth } from '@/utils/web3Auth'
import Web3 from 'web3'
import { OpenloginUserInfo } from '@toruslabs/openlogin-utils'
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
// import { Web3Auth } from '@web3auth/modal'

const useWeb3Auth = () => {
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<OpenloginUserInfo | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  console.log('userInfo', userInfo)
  console.log('loggedIn', loggedIn)

  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo()
      // Ensure that user object has all the properties of IUserInfo, with fallbacks for undefined properties
      setUserInfo(user as OpenloginUserInfo) // Save user information in state
      uiConsole(user)
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе:', error)
      uiConsole('Ошибка при получении информации о пользователе')
    }
  }

  const login = async () => {
    const web3authProvider = await web3auth.connect()
    setProvider(web3authProvider)
    if (web3auth.connected) {
      setLoggedIn(true)
    }
  }

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout()
    // IMP END - Logout
    setProvider(null)
    setLoggedIn(false)
    setAddress(null)
    setUserInfo(null)
    setBalance(null)
    uiConsole('logged out')
  }

  // IMP START - Blockchain Calls
  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    const web3 = new Web3(provider as any)

    // Get user's Ethereum public address
    const accounts = await web3.eth.getAccounts()
    setAddress(accounts[0])
    console.log('accounts', accounts)
    uiConsole(address)
  }

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    const web3 = new Web3(provider as any)

    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0]

    // Get user's balance in ether
    const bal = web3.utils.fromWei(
      await web3.eth.getBalance(address), // Balance is in wei
      'ether'
    )
    console.log('balance', bal)
    setBalance(bal)
    uiConsole(bal)
  }

  const signMessage = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet')
      return
    }
    const web3 = new Web3(provider as any)

    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0]

    const originalMessage = 'YOUR_MESSAGE'

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      'test password!' // configure your own password here.
    )
    uiConsole(signedMessage)
  }

  function uiConsole(...args: any[]): void {
    const el = document.querySelector('#console>p')
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
      console.log(...args)
      //   setDisplay.apply(null, args)
    }
  }

  return {
    address,
    balance,
    userInfo,
    provider,
    loggedIn,
    login,
    logout,
    setProvider,
    setLoggedIn,
    signMessage,
    getBalance,
    getAccounts,
    getUserInfo
  }
}

export { useWeb3Auth }
