/**
 * @file Register Modal Component
 * @description Modal dialog for new user registration with comprehensive validation.
 * Includes form fields for personal information, email, and password with confirmation.
 * Displays as an overlay using React Router's location state for background preservation.
 */

import { Link, useNavigate, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register } from '@/service/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { DialogDescription } from '@radix-ui/react-dialog';

/**
 * Zod schema for registration form validation.
 * 
 * Validation rules:
 * - first_name: Minimum 2 characters
 * - last_name: Minimum 2 characters
 * - age: Minimum 18 years (coerced to number)
 * - email: Must be valid email format
 * - password: Minimum 6 characters (basic validation)
 * - confirmPassword: Minimum 8 characters with complexity requirements:
 *   - At least one lowercase letter
 *   - At least one uppercase letter
 *   - At least one digit
 *   - At least one special character
 * 
 * @constant
 * 
 * @note There's a validation inconsistency:
 * - password requires min 6 chars
 * - confirmPassword requires min 8 chars with regex
 * This should be unified for better UX.
 * 
 * @example
 * ```typescript
 * ✅ Valid registration data:
 * {
 *   first_name: "John",
 *   last_name: "Doe",
 *   age: 25,
 *   email: "john@example.com",
 *   password: "SecurePass123!",
 *   confirmPassword: "SecurePass123!"
 * }
 * ```
 */
const registerSchema = z.object({
  /** User's first name (minimum 2 characters) */
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),

  /** User's last name (minimum 2 characters) */
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),

  /** User's age (minimum 18 years, coerced from string input to number) */
  age: z.coerce.number().min(18, "Debes tener al menos 18 años") as z.ZodNumber,

  /** User's email address (must be valid email format) */
  email: z.string().email("Debe ser un correo válido"),

  /** 
   * User's password (minimum 6 characters).
   * @todo Increase to 8 characters and add complexity requirements to match confirmPassword
   */
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),

  /** 
   * Password confirmation (minimum 8 characters with complexity requirements).
   * Must include: lowercase, uppercase, digit, and special character.
   * @todo Add .refine() to check password === confirmPassword
   */
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"),
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
 * Register Modal Component
 * 
 * Renders a modal dialog for new user registration. Features include:
 * - Personal information fields (name, last name, age)
 * - Email validation
 * - Password fields with visibility toggle
 * - Password confirmation
 * - Loading state during registration
 * - Error handling with toast notifications
 * - Link to login page for existing users
 * - Preserves background route for seamless UX
 * 
 * @component
 * 
 * @example
 * ```tsx
 * In your router configuration:
 * <Route
 *   path="/registrarse"
 *   element={<RegisterModal />}
 * />
 * 
 * Navigate to register preserving background:
 * navigate('/registrarse', {
 *   state: { background: location }
 * });
 * ```
 * 
 * @returns {JSX.Element} Registration modal dialog
 * 
 * @remarks
 * - Uses React Hook Form for form state management
 * - Zod for schema validation
 * - Sonner for toast notifications
 * - Shadcn/ui components for UI
 * - After successful registration, redirects to login page
 * 
 * @todo Add password match validation with .refine()
 * @todo Unify password validation requirements (6 chars vs 8 chars)
 * @todo Add password strength indicator
 */
export default function RegisterModal() {

  /**
   * React Router navigation hook.
   * Used to redirect after successful registration or close modal.
   */
  const navigate = useNavigate();

  /**
   * React Router navigation hook.
   * Used to redirect after successful registration or close modal.
   */
  const location = useLocation() as RouterLocation & { state: LocationState };

  /**
   * Background location to return to when modal closes.
   * Enables modal to overlay existing page without losing context.
   */
  const background = location.state?.background;

  /**
   * State for password visibility toggle.
   * When true, passwords are shown as plain text; when false, shown as dots.
   * Applies to both password and confirmPassword fields simultaneously.
   */
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Loading state during registration API call.
   * Used to disable form submission and show loading indicator.
   */
  const [loading, setLoading] = useState(false)

  /**
   * React Hook Form instance for registration form.
   * Configured with Zod schema validation and default values.
   */
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { first_name: "", last_name: "", email: "", age: 18, password: "", confirmPassword: "" },
  })

  /**
   * Handles modal close action.
   * Navigates to discover page only if not currently loading.
   * Prevents accidental closure during registration.
   * 
   * @function handleClose
   * @returns {void}
   */
  const handleClose = () => {
    if (background && !loading) navigate(background.pathname);
    else navigate("/descubre");
  };

    /**
   * Handles registration form submission.
   * 
   * Process:
   * 1. Sets loading state
   * 2. Transforms form data to match API format (snake_case to camelCase)
   * 3. Calls registration API endpoint
   * 4. Redirects to login page on success
   * 5. Shows success toast notification
   * 6. Handles errors with toast notification
   * 7. Resets loading state
   * 
   * @async
   * @function handleRegister
   * @param {RegisterFormValues} values - Form values from React Hook Form
   * @returns {Promise<void>}
   * 
   * @example
   * ```typescript
   * Called automatically on form submit:
   * handleRegister({
   *   first_name: "John",
   *   last_name: "Doe",
   *   age: 25,
   *   email: "john@example.com",
   *   password: "SecurePass123!",
   *   confirmPassword: "SecurePass123!"
   * });
   * ```
   * 
   * @remarks
   * - Transforms snake_case form fields to camelCase for API
   * - Omits confirmPassword from API payload (only used for client validation)
   * - On success, redirects to login instead of auto-logging in
   */
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setLoading(true)

      // Transform form data to API format
      await register({
        firstName: values.first_name,
        lastName: values.last_name,
        age: values.age,
        email: values.email,
        password: values.password,
        // confirmPassword is not sent to API (client-side validation only)
      })

      // Redirect to login page after successful registration
      navigate("/iniciar-sesion", { state: { background: location } })

      // Show success notification
      toast.success("Registro exitoso")
    } catch (error) {
      // Handle and display error
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al registrar")
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
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FormField
                control={registerForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa apellido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={registerForm.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Edad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
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

            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
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
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <p className="text-center text-sm text-primary">
              ¿Ya estás registrado?{" "}
              <Link
                to="/iniciar-sesion"
                state={{ background }}
                className="primary"
              >
                Inicia Sesión
              </Link>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}