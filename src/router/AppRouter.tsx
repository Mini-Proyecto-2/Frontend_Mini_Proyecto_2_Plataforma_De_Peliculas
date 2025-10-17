import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "../components/router/PublicRoute";
import ProtectedRoute from "../components/router/ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { Toaster } from "sonner";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              {/* <Route path="/registrarse" element={<Register />} />
              <Route path="/recuperar-contraseña" element={<ForgotPassword />} /> */}
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
