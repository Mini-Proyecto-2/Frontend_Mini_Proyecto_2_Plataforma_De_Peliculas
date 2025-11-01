/**
 * @file New Password Modal Component
 * @description Component for resetting user password using a valid reset token.
 * Validates token from URL query parameters, ensures password strength requirements,
 * and confirms password match before submission.
 */

import { useNavigate, useSearchParams, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { validateResetToken, confirmResetPassword } from '@/service/auth';
import { Spinner } from '../ui/spinner';

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
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  /**
   * Effect to validate token presence on component mount.
   * Validates the reset token with the backend API.
   * 
   * @effect
   * @dependency {string | null} token - Reset token from URL
   */
  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setTokenError('Enlace inválido o caducado');
        setValidatingToken(false);
        return;
      }

      try {
        setValidatingToken(true);
        await validateResetToken(token);
        setTokenValid(true);
        setTokenError(null);
      } catch (error) {
        if (error instanceof Error) {
          setTokenError(error.message || 'Enlace inválido o caducado');
        } else {
          setTokenError('Enlace inválido o caducado');
        }
        setTokenValid(false);
      } finally {
        setValidatingToken(false);
      }
    };

    checkToken();
  }, [token]);

  /**
   * React Hook Form instance for password reset form.
   * Configured with Zod schema validation and default empty values.
   */
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  /**
   * Watch password and confirmPassword values for dynamic validation
   */
  const passwordValue = resetPasswordForm.watch('password') || '';
  const confirmPasswordValue = resetPasswordForm.watch('confirmPassword') || '';

  /**
   * Validates password requirements and returns validation status for each rule
   */
  const passwordRequirements = {
    minLength: passwordValue.length >= 8,
    hasLowercase: /[a-z]/.test(passwordValue),
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecialChar: /\W/.test(passwordValue),
  };

  /**
   * Checks if passwords match
   */
  const passwordsMatch = passwordValue === confirmPasswordValue && confirmPasswordValue.length > 0;

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
    if (!token) return;

    try {
      setLoading(true);
      await confirmResetPassword(token, values.password);
      toast.success("Contraseña restablecida exitosamente");
      
      // Redirigir al login después de un breve delay
      setTimeout(() => {
        navigate('/iniciar-sesion', { state: { background: location.state?.background } });
      }, 1000);
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

  // Mostrar spinner mientras se valida el token
  if (validatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[450px]">
          <CardContent className="pt-10 pb-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner className="size-[3rem]" />
              <p className="text-muted-foreground">Validando enlace...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mostrar error si el token es inválido
  if (!tokenValid || tokenError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle><img src={logo} alt="Logo" className="h-20" /></CardTitle>
            <CardDescription className="text-primary text-md">El cine nos une</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">
                {tokenError || 'Enlace inválido o caducado'}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/descubre')}
                className="w-full"
              >
                Ir al inicio
              </Button>
              <Button
                variant="link"
                onClick={() => navigate('/recuperar-contraseña', { state: { background: location } })}
                className="w-full"
              >
                Reenviar enlace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  {/* Mostrar restricciones pendientes en lista separada por comas */}
                  {passwordValue.length > 0 && (() => {
                    const pendingRequirements = [];

                    if (!passwordRequirements.minLength) {
                      pendingRequirements.push('8 caracteres');
                    }
                    if (!passwordRequirements.hasLowercase || !passwordRequirements.hasUppercase) {
                      pendingRequirements.push('una letra mayúscula y minúscula');
                    }
                    if (!passwordRequirements.hasNumber) {
                      pendingRequirements.push('un número');
                    }
                    if (!passwordRequirements.hasSpecialChar) {
                      pendingRequirements.push('un carácter especial');
                    }

                    if (pendingRequirements.length > 0) {
                      return (
                        <div className="mt-2 flex items-start gap-1.5 text-xs text-destructive">
                          <X className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                          <span className="flex-1">
                            <span className="font-medium">La contraseña debe tener:</span>{' '}
                            {pendingRequirements.join(', ')}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                        <Check className="h-3.5 w-3.5" />
                        <span>Contraseña válida</span>
                      </div>
                    );
                  })()}
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
                    {/* Mostrar validación de coincidencia dinámicamente */}
                    {confirmPasswordValue.length > 0 && (
                      <div className="mt-2">
                        <div className={`flex items-center gap-2 text-xs ${passwordsMatch ? 'text-green-600' : 'text-destructive'}`}>
                          {passwordsMatch ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <X className="h-3.5 w-3.5" />
                          )}
                          <span>Las contraseñas coinciden</span>
                        </div>
                      </div>
                    )}
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