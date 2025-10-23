import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "../components/router/PublicRoute";
import ProtectedRoute from "../components/router/ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import WelcomePage from "../pages/auth/Welcome";
import SiteMapPage from "../pages/SiteMap";
import NotFound from "../pages/NotFound";
import { Toaster } from "sonner";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="auth" element={<AuthLayout />}>
              <Route path="iniciar-sesion" element={<LoginPage />} />
              {/* <Route path="registrarse" element={<RegisterPage />} /> */}
            </Route>
            <Route path="mapa-sitio" element={<SiteMapPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              {/* More protected routes here */}
            </Route>
          </Route>

          {/* 404 - must be at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}