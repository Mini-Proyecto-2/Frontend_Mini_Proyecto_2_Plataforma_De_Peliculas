/**
 * @file Authentication Context Provider
 * @description Global authentication state management using React Context API.
 * Manages user authentication status, token storage, and provides auth methods
 * throughout the application. Handles login, logout, and loading states.
 * 
 * Features:
 * - Persistent authentication via localStorage
 * - Loading states for auth operations
 * - Automatic token restoration on mount
 * - Type-safe context with TypeScript
 * - Global auth state accessible via useAuth hook
 * 
 * @module AuthContext
 */

/* eslint-disable react-refresh/only-export-components */
"use client"

import { logout, session } from "@/service/auth"
import { createContext, useContext, useState, useEffect } from "react"

/**
 * @file auth-context.tsx
 * @description Authentication context provider for managing user login state, persistence, and logout.
 * Wraps the application to give access to authentication state (`isLoggedIn`, `loading`) and actions (`authLogin`, `authLogout`).
 *
 * @example
 * ```tsx
 * import { AuthProvider, useAuth } from "@/context/auth-context"
 *
 * export function App() {
 *   return (
 *     <AuthProvider>
 *       <Dashboard />
 *     </AuthProvider>
 *   )
 * }
 *
 * function Dashboard() {
 *   const { isLoggedIn, authLogin, authLogout } = useAuth()
 *
 *   if (!isLoggedIn) {
 *     return <button onClick={() => authLogin("fake-token")}>Login</button>
 *   }
 *
 *   return <button onClick={authLogout}>Logout</button>
 * }
 * ```
 */

/**
 * Defines the shape of the authentication context.
 */
type AuthContextType = {
  /** Whether the user is currently authenticated. */
  isLoggedIn: boolean

  /** Indicates whether the authentication state is being initialized or updated. */
  loading: boolean

  /**
   * Logs the user in and stores the authentication token in `localStorage`.
   * @param token - The authentication token to store.
   */
  authLogin: (token: string) => void

  /**
   * Logs the user out, clears stored authentication data,
   * and calls the `logout()` service function.
   */
  authLogout: () => Promise<void>
}

/**
 * Internal React context for managing authentication state.
 * @internal
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provides authentication state and methods to its child components.
 * Must wrap the part of the app that requires authentication awareness.
 *
 * @component
 * @param props.children - The components that will consume the authentication context.
 * @returns The provider component exposing authentication logic and state.
 */
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

  /**
   * Stores the auth token and updates login state.
<<<<<<< HEAD
   * @param token - The JWT or session token to store.
   */
  const authLogin = (token: string) => {
=======
   */
  const authLogin = () => {
>>>>>>> origin/Develop
    setIsLoggedIn(true)
  }

  /**
   * Clears the stored token, resets authentication state,
   * and executes the `logout` service function.
   */
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

/**
 * Custom React hook to access authentication state and actions.
 * Must be used within an `AuthProvider`.
 *
 * @throws Will throw an error if used outside of `AuthProvider`.
 * @returns The authentication context value containing state and functions.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
