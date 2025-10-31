/**
 * @file Login Modal Component
 * @description Modal dialog for user authentication with email/password.
 * Includes form validation, password visibility toggle, and error handling.
 * Displayed as an overlay using React Router's location state for background preservation.
 */

import { Link, useNavigate, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '../ui/form';
import { FormField } from '../ui/form';
import { FormItem } from '../ui/form';
import { FormLabel } from '../ui/form';
import { FormControl } from '../ui/form';
import { FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/service/auth';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { DialogDescription } from '@radix-ui/react-dialog';
import logo from '@/assets/logo.png';

/**
 * Zod schema for login form validation.
 * 
 * Validation rules:
 * - username: Must be a valid email format
 * - password: Minimum 6 characters
 * 
 * @constant
 */
const loginSchema = z.object({
  /** User's email address */
  username: z.string().email("Debe ser un correo válido"),

  /** User's password (minimum 6 characters) */
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

/**
 * Interface for React Router location state.
 * Used to preserve the background location when modal is opened.
 * 
 * @interface LocationState
 * @property {RouterLocation} [background] - Previous location to return to when modal closes
 */
interface LocationState {
  background?: RouterLocation;
}

/**
 * Login Modal Component
 * 
 * Renders a modal dialog for user authentication. Features include:
 * - Email and password input fields with validation
 * - Password visibility toggle (show/hide)
 * - Loading state during authentication
 * - Error handling with toast notifications
 * - Links to password recovery and registration
 * - Preserves background route for seamless UX
 * 
 * @component
 * 
 * @example
 * ```tsx
 * In your router configuration:
 * <Route
 *   path="/iniciar-sesion"
 *   element={<LoginModal />}
 * />
 * 
 * Navigate to login preserving background:
 * navigate('/iniciar-sesion', {
 *   state: { background: location }
 * });
 * ```
 * 
 * @returns {JSX.Element} Login modal dialog
 * 
 * @remarks
 * - Uses React Hook Form for form state management
 * - Zod for schema validation
 * - Sonner for toast notifications
 * - Shadcn/ui components for UI
 * - Integrates with AuthContext for global auth state
 */
export default function LoginModal() {
  /**
   * Auth context hook for managing authentication state.
   * Provides authLogin function to update global auth state.
   */
  const { authLogin } = useAuth()

  /**
   * React Router navigation hook.
   * Used to redirect after successful login or close modal.
   */
  const navigate = useNavigate();

  /**
   * Current location from React Router.
   * Contains state with background location if modal was opened over existing route.
   */
  const location = useLocation() as RouterLocation & { state: LocationState };

  /**
   * Background location to return to when modal closes.
   * Enables modal to overlay existing page without losing context.
   */
  const background = location.state?.background;

  /**
   * State for password visibility toggle.
   * When true, password is shown as plain text; when false, shown as dots/asterisks.
   */
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Loading state during login API call.
   * Used to disable form submission and show loading indicator.
   */
  const [loading, setLoading] = useState(false)

  /**
   * React Hook Form instance for login form.
   * Configured with Zod schema validation and default empty values.
   */
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  /**
   * Handles modal close action.
   * Navigates to discover page only if not currently loading.
   * Prevents accidental closure during authentication.
   * 
   * @function handleClose
   * @returns {void}
   */
  const handleClose = () => {
    if (!loading) navigate("/descubre");
  };

  /**
   * Handles login form submission.
   * 
   * Process:
   * 1. Sets loading state
   * 2. Calls login API with credentials
   * 3. Updates global auth state with token
   * 4. Navigates to home page
   * 5. Shows success toast
   * 6. Handles errors with toast notification
   * 7. Resets loading state
   * 
   * @async
   * @function handleLogin
   * @param {LoginFormValues} values - Form values containing username and password
   * @returns {Promise<void>}
   * 
   * @example
   * ```typescript
   * Called automatically on form submit:
   * handleLogin({
   *   username: "user@example.com",
   *   password: "SecurePass123!"
   * });
   * ```
   */
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true)

      // Call login API endpoint
      const token = await login(values.username, values.password)

      // Update global auth state
      authLogin(token)

      // Redirect to home page
      navigate("/")

      // Show success notification
      toast.success("Inicio de sesión exitoso")
    } catch (error) {

      // Handle and display error
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al iniciar sesión")
      }
    } finally {
      // Always reset loading state
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className='flex flex-col items-center text-primary'>
          <DialogTitle><img src={logo} alt="Logo" className="h-20" /></DialogTitle>
          <DialogDescription>El cine nos une</DialogDescription>
        </DialogHeader>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username" className="text-primary">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Ingresa el correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-primary">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa la contraseña"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>

            <p className="text-center text-sm text-primary">
              ¿Olvidaste tu contraseña?{" "}
              <Link
                to="/recuperar-contraseña"
                state={{ background }}
                className="primary"
              >
                Recupera tu contraseña
              </Link>
            </p>

            <p className="text-center text-sm text-primary">
              ¿No tienes cuenta?{" "}
              <Link
                to="/registrarse"
                state={{ background }}
                className="primary"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}