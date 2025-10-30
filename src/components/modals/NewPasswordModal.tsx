/**
 * @file New Password Modal Component
 * @description Component for resetting user password using a valid reset token.
 * Validates token from URL query parameters, ensures password strength requirements,
 * and confirms password match before submission.
 */

import { useNavigate, useSearchParams, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

/**
 * Zod schema for password reset form validation.
 * 
 * Validation rules:
 * - password: Minimum 8 characters, must include:
 *   - At least one lowercase letter (a-z)
 *   - At least one uppercase letter (A-Z)
 *   - At least one digit (0-9)
 *   - At least one special character
 * - confirmPassword: Must match password field
 * 
 * @constant
 * 
 * @example
 * ```typescript
 * ✅ Valid passwords:
 * "SecurePass123!"
 * "MyP@ssw0rd"
 * "Strong#Pass99"
 * 
 * ❌ Invalid passwords:
 * "password" - no uppercase, no number, no special char
 * "Pass123" - too short (< 8 chars)
 * "PASSWORD123!" - no lowercase
 * ```
 */
const resetPasswordSchema = z.object({

  /** 
   * New password field.
   * Must meet complexity requirements.
   */
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"),
  
  /**
   * Password confirmation field.
   * Must match the password field exactly.
   */
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Error appears on confirmPassword field
});

/**
 * Interface for React Router location state.
 * Used to preserve background location for seamless navigation.
 * 
 * @interface LocationState
 * @property {RouterLocation} [background] - Previous location to return to
 */
interface LocationState {
  background?: RouterLocation;
}

/**
 * New Password Modal Component
 * 
 * Allows users to set a new password after requesting password reset.
 * Token must be present in URL query parameters (from email link).
 * 
 * Features:
 * - Token validation from URL
 * - Strong password requirements with regex validation
 * - Password confirmation matching
 * - Password visibility toggle
 * - Loading states and error handling
 * - Automatic redirect if token is missing/invalid
 * 
 * @component
 * 
 * @example
 * ```tsx
 * In your router configuration:
 * <Route
 *   path="/nueva-contraseña"
 *   element={<NewPasswordModal />}
 * />
 * 
 * User receives email with link:
 * https://yourapp.com/nueva-contraseña?token=abc123def456
 * ```
 * 
 * @returns {JSX.Element | null} Password reset form or null if no token
 * 
 * @remarks
 * - Requires valid reset token in URL query parameters
 * - Redirects to welcome page if token is missing
 * - Uses React Hook Form for form state management
 * - Zod for schema validation
 * - Integrates with backend password reset endpoint
 */
export default function NewPasswordModal() {

  /**
   * React Router navigation hook.
   * Used to redirect after password reset or if token is invalid.
   */
  const navigate = useNavigate();

  /**
   * Current location from React Router.
   * Contains state for preserving background location.
   */
  const location = useLocation() as RouterLocation & { state: LocationState };

  /**
   * URL search parameters hook.
   * Used to extract reset token from query string.
   * 
   * @example
   * URL: /reset-password?token=abc123
   * token = "abc123"
   */
  const [searchParams] = useSearchParams();

  /**
   * Reset token from URL query parameters.
   * Must be present for password reset to work.
   * Comes from the email link sent via forgot password flow.
   * 
   * @type {string | null}
   */
  const token = searchParams.get('token');

  /**
   * State for password visibility toggle.
   * Controls whether passwords are shown as plain text or masked.
   * Applies to both password and confirmPassword fields.
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Loading state during password reset API call.
   * Used to disable form submission and show loading indicator.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Effect to validate token presence on component mount.
   * Redirects to welcome page if token is missing or invalid.
   * 
   * @effect
   * @dependency {string | null} token - Reset token from URL
   * @dependency {Function} navigate - Navigation function
   */
  useEffect(() => {
    if (!token) {
      toast.error('Token inválido o expirado');
      navigate('/welcome');
    }
  }, [token, navigate]);

  /**
   * React Hook Form instance for password reset form.
   * Configured with Zod schema validation and default empty values.
   */
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  /**
   * Handles password reset form submission.
   * 
   * Process:
   * 1. Sets loading state
   * 2. Calls password reset API with token and new password
   * 3. Shows success toast notification
   * 4. Redirects to discover page
   * 5. Handles errors with toast notification
   * 6. Resets loading state
   * 
   * @async
   * @function handleResetPassword
   * @param {ResetPasswordFormValues} values - Form values containing password and confirmPassword
   * @returns {Promise<void>}
   * 
   * @example
   * ```typescript
   * Called automatically on form submit:
   * handleResetPassword({
   *   password: "NewSecurePass123!",
   *   confirmPassword: "NewSecurePass123!"
   * });
   * ```
   * 
   * @todo Implement actual API call to backend
   * @todo Import resetPassword service function
   */
  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true);
      
      // Call password reset API endpoint
      // await resetPassword(token!, values.password);
      console.log('Token:', token, 'Nueva contraseña:', values.password);

      // Show success notification
      toast.success("Contraseña restablecida exitosamente");

      // Redirect to discover page, preserving background if available
      navigate('/descubre', { state: { background: location.state?.background } });
    } catch (error) {
      // Handle and display error
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al restablecer contraseña");
      }
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  /**
   * Early return if token is not present.
   * Prevents rendering the form without a valid token.
   */
  if (!token) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader className='flex flex-col items-center'>
          <CardTitle><img src={logo} alt="Logo" className="h-20" /></CardTitle>
          <CardDescription className="text-primary text-md">El cine nos une</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-6 py-6">
              <FormField
                control={resetPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Nueva Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa la nueva contraseña"
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
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirma la nueva contraseña"
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
                {loading ? "Restableciendo..." : "Restablecer Contraseña"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}