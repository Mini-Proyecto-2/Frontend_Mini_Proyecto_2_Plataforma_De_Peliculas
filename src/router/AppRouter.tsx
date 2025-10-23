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
          {/* Rutas públicas */}
          <Route path="/bienvenida" element={<WelcomePage />} />
          <Route path="/mapa-sitio" element={<SiteMapPage />} />
          
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}