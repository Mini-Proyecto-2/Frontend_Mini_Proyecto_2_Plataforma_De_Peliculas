import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "../components/router/PublicRoute";
import ProtectedRoute from "../components/router/ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import WelcomePage from "../pages/auth/Welcome";
import SiteMapPage from "../pages/SiteMap";
import NotFound from "../pages/NotFound";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import { Toaster } from "sonner";

function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* Rutas principales */}
      <Routes location={background || location}>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="auth" element={<AuthLayout />}>
          </Route>
          <Route path="mapa-sitio" element={<SiteMapPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Modales flotantes - solo se renderizan si hay background */}
      {background && (
        <Routes>
          <Route path="/iniciar-sesion" element={<LoginModal />} />
          <Route path="/registrarse" element={<RegisterModal />} />
        </Routes>
      )}
    </>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}