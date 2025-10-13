"use client"

import { Navigate, Outlet } from "react-router-dom"
import { FullScreenLoader } from "./Loader"
import { useAuth } from "../../context/AuthContext"

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) return <FullScreenLoader />

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}