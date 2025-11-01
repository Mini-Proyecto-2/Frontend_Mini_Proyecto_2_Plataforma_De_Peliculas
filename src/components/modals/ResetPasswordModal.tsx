/**
 * @file Reset Password Modal Component
 * @description Modal dialog for initiating password reset process.
 * User enters their email to receive a password reset link.
 * Part of the "forgot password" flow before NewPasswordModal.
 */

import { useNavigate, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '../ui/form';
import { FormField } from '../ui/form';
import { FormItem } from '../ui/form';
import { FormLabel } from '../ui/form';
import { FormControl } from '../ui/form';
import { FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { DialogDescription } from '@radix-ui/react-dialog';
import logo from '@/assets/logo.png';
import { resetPassword } from '@/service/auth';

/**
 * Zod schema for password reset request form validation.
 * 
 * Validation rules:
 * - username: Must be a valid email format
 * 
 * @constant
 * 
 * @note Field is named "username" but expects email format for consistency
 * with login form field naming.
 */
const resetPasswordSchema = z.object({
  /** User's email address (labeled as "username" for form consistency) */
  username: z.string().email("Debe ser un correo válido"),
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
 * Reset Password Modal Component
 * 
 * First step in the password recovery flow. User enters their email address
 * to receive a password reset link. This is the "forgot password" modal.
 * 
 * Password Recovery Flow:
 * 1. User opens this modal (ResetPasswordModal)
 * 2. User enters email
 * 3. Backend sends email with reset token
 * 4. User clicks link in email → opens NewPasswordModal with token
 * 5. User sets new password
 * 
 * Features:
 * - Email validation
 * - Loading state during API call
 * - Error handling with toast notifications
 * - Redirects to login after successful request
 * - Preserves background route for seamless UX
 * 
 * @component
 * 
 * @example
 * ```tsx
 * In your router configuration:
 * <Route
 *   path="/recuperar-contraseña"
 *   element={<ResetPasswordModal />}
 * />
 * 
 * Navigate to reset password modal:
 * navigate('/recuperar-contraseña', {
 *   state: { background: location }
 * });
 * ```
 * 
 * @returns {JSX.Element} Password reset request modal dialog
 * 
 * @remarks
 * - Uses React Hook Form for form state management
 * - Zod for email validation
 * - Sonner for toast notifications
 * - Shadcn/ui components for UI
 * - After submission, user is redirected to login page
 * 
 * @todo Implement actual API call to forgotPassword endpoint
 * @todo Import forgotPassword service function
 * 
 * @see {@link NewPasswordModal} - Second step where user sets new password
 */
export default function ResetPasswordModal() {
  /**
   * React Router navigation hook.
   * Used to redirect after password reset request or close modal.
   */
  const navigate = useNavigate();

  /**
   * Current location from React Router.
   * Contains state with background location if modal was opened over existing route.
   */
  const location = useLocation() as RouterLocation & { state: LocationState };

  /**
   * Loading state during password reset request API call.
   * Used to disable form submission and show loading indicator.
   */
  const [loading, setLoading] = useState(false)

  /**
   * React Hook Form instance for password reset request form.
   * Configured with Zod schema validation and default empty value.
   */
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { username: "" },
  })

  /**
   * Handles modal close action.
   * Navigates to discover page only if not currently loading.
   * Prevents accidental closure during API call.
   * 
   * @function handleClose
   * @returns {void}
   */
  const handleClose = () => {
    if (location.state.background && !loading) navigate(location.state.background.pathname);
    else navigate("/descubre");
  };

  /**
   * Handles password reset request form submission.
   * 
   * Process:
   * 1. Sets loading state
   * 2. Calls forgot password API endpoint with user's email
   * 3. Backend generates reset token and sends email with link
   * 4. Redirects to login page (user will check email)
   * 5. Shows success toast notification
   * 6. Handles errors with toast notification
   * 7. Resets loading state
   * 
   * @async
   * @function handleResetPassword
   * @param {ResetPasswordFormValues} values - Form values containing user's email
   * @returns {Promise<void>}
   * 
   * @example
   * ```typescript
   * Called automatically on form submit:
   * handleResetPassword({
   *   username: "user@example.com"
   * });
   * 
   * Backend process:
   * 1. Finds user by email
   * 2. Generates random token (crypto.randomBytes)
   * 3. Stores token in database with expiration (1 hour)
   * 4. Sends email with link: 
   * https://app.com/nueva-contraseña?token=abc123...
   * ```
   * 
   * @remarks
   * - Currently logs to console (TODO: implement real API call)
   * - Success message shown even before email is actually sent
   * - User is redirected to login to wait for email
   */
  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true)
      await resetPassword(values.username)
      navigate("/iniciar-sesion", { state: { background: location } })

      // Show success notification
      toast.success("Correo enviado correctamente")
    } catch (error) {
      // Handle and display error
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al restablecer contraseña")
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
        <Form {...resetPasswordForm}>
          <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-6 py-6">
            <FormField
              control={resetPasswordForm.control}
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Cargando..." : "Enviar Correo"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}