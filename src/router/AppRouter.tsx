/**
 * @file AppRouter.tsx
 * @description Application routing setup for FilmUnity. It defines public and protected routes,
 * supports modal routes rendered over a background location (login/register/reset password),
 * and wraps the app with the authentication provider and router.
 *
 * @remarks
 * - Uses React Router v6 nested routes with a shared `MainLayout` for authenticated areas.
 * - Public routes (e.g., welcome/marketing pages) are guarded by `PublicRoute`.
 * - Authenticated routes are guarded by `ProtectedRoute`.
 * - Modal routes are conditionally rendered using the `background` location pattern.
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "../components/router/PublicRoute";
import ProtectedRoute from "../components/router/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import WelcomePage from "../pages/Welcome";
import SiteMapPage from "../pages/SiteMap";
import NotFound from "../pages/NotFound";
import Favorites from '../pages/Favorites';
import MovieDetail from "../pages/MovieDetail";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import ResetPasswordModal from "../components/modals/ResetPasswordModal";
import NewPasswordModal from "../components/modals/NewPasswordModal";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

import { Toaster } from "sonner";
import type { JSX } from "react";

/**
 * AppRoutes component.
 *
 * @description Declares the main route tree for the application, including:
 * - Public (unauthenticated) routes.
 * - Protected (authenticated) routes with a nested layout (`MainLayout`).
 * - Site map and 404 fallback.
 * - Floating modal routes that render on top of the current screen using the
 *   `background` location pattern.
 *
 * @returns {JSX.Element} The route configuration rendered by `<Routes />`.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <AppRoutes />
 *     </BrowserRouter>
 *   )
 * }
 * ```
 */
function AppRoutes(): JSX.Element {
  // Current route location, possibly containing a `background` entry when navigating to modal routes.
  const location = useLocation();

  /**
   * Optional background location to support "modal over page" navigation.
   * When present, `Routes` will render the page for the background location,
   * while a second `Routes` block renders the modal route on top.
   *
   * @see https://reactrouter.com/en/main/hooks/use-location#modals
   */
  const background = location.state?.background;

  return (
    <>
      {/* Rutas principales */}
      <Routes location={background || location}>
        {/* Auth routes */}
        <Route element={<PublicRoute />}>
          <Route path="/descubre" element={<WelcomePage />} />
          <Route path="/nueva-contraseña" element={<NewPasswordModal />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="configuracion" element={<Settings />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/pelicula/:id" element={<MovieDetail />} />
          </Route>
        </Route>

        {/* SiteMap */}
        <Route path="mapa-sitio" element={<SiteMapPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />        


      </Routes>

      {/* Modales flotantes - solo se renderizan si hay background */}
      {background && (
        <Routes>
          <Route path="/iniciar-sesion" element={<LoginModal />} />
          <Route path="/registrarse" element={<RegisterModal />} />
          <Route path="/recuperar-contraseña" element={<ResetPasswordModal />} />
        </Routes>
      )}
    </>
  );
}

/**
 * AppRouter component.
 *
 * @description Top-level router + providers composition:
 * - Wraps the application in `AuthProvider` for auth state.
 * - Initializes `BrowserRouter` to enable client-side routing.
 * - Renders global `Toaster` for notifications.
 *
 * @returns {JSX.Element} The composed router and providers.
 */
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