/* eslint-disable react-refresh/only-export-components */
"use client"

import { logout } from "@/service/auth"
import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  loading: boolean
  authLogin: (token: string) => void
  authLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem("auth")
    if (authToken) setIsLoggedIn(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const authLogin = (token: string) => {
    setIsLoggedIn(true)
    localStorage.setItem("auth", token)
  }

  const authLogout = async () => {
    setLoading(true)
    setIsLoggedIn(false)
    await logout();
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, authLogin, authLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
