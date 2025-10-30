/**
 * @file Protected Route Component
 * @description Route guard component that restricts access to authenticated users only.
 * Displays a loading screen during authentication check, then either renders
 * protected content or redirects to discover page based on authentication status.
 */

"use client"

import { Navigate, Outlet } from "react-router-dom"
import { FullScreenLoader } from "./Loader"
import { useAuth } from "../../context/AuthContext"

/**
 * React component that protects nested routes based on authentication status.
 *
 * @component
 * @example
 * ```tsx
 * import ProtectedRoute from "@/components/shared/ProtectedRoute";
 *
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 * ```
 *
 * @returns
 * - `<FullScreenLoader />` while the authentication status is being resolved.
 * - `<Outlet />` if the user is authenticated.
 * - `<Navigate />` redirecting to `/descubre` if the user is not logged in.
 */

export default function ProtectedRoute() {
  /** Authentication context providing user state and loading flag. */
  const { isLoggedIn, loading } = useAuth()

  /** Render loading state while checking authentication. */
  if (loading) return <FullScreenLoader />

  /** Render nested routes if logged in; otherwise redirect to the public page. */
  return isLoggedIn ? <Outlet /> : <Navigate to="/descubre" replace />
}