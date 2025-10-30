/**
 * @file Public Route Component
 * @description Route guard component that restricts access to unauthenticated users only.
 * Redirects authenticated users to home page. Used for login, register, and other
 * auth-related pages that logged-in users shouldn't access.
 */

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FullScreenLoader } from "./Loader"

/**
 * React component that restricts access to routes meant only for unauthenticated users.
 *
 * @component
 * @example
 * ```tsx
 * import PublicRoute from "@/components/shared/PublicRoute";
 *
 * <Route element={<PublicRoute />}>
 *   <Route path="/login" element={<LoginPage />} />
 *   <Route path="/register" element={<RegisterPage />} />
 * </Route>
 * ```
 *
 * @returns
 * - `<FullScreenLoader />` while the authentication state is being resolved.
 * - `<Outlet />` if the user is **not** logged in (renders the public route).
 * - `<Navigate />` redirecting to `/` if the user **is** already authenticated.
 */
export default function PublicRoute() {
  /** Authentication context providing login state and loading indicator. */
  const { isLoggedIn, loading } = useAuth()

  /** Render loader while authentication state is being verified. */
  if (loading) return <FullScreenLoader />

  /** Allow access if not logged in, otherwise redirect to the home page. */
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}