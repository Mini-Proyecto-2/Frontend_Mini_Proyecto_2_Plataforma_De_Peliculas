import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FullScreenLoader } from "./Loader"

export default function PublicRoute() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) return <FullScreenLoader />

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}