/* eslint-disable react-refresh/only-export-components */
"use client"

import { logout, session } from "@/service/auth"
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
    const checkSession = async () => {
      try {
        const sessionData = await session();
        if (sessionData === 401) {
          setIsLoggedIn(false)
        } else {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error("Error al verificar sesión:", error)
        setIsLoggedIn(false)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    }

    checkSession();
  }, [])

  const authLogin = () => {
    setIsLoggedIn(true)
  }

  const authLogout = async () => {
    setLoading(true)
    setIsLoggedIn(false)
    await logout();
    setTimeout(() => {
      setLoading(false)
    }, 1000);
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
