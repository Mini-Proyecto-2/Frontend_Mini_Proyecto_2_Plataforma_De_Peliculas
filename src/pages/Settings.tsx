/**
 * @file Settings.tsx
 * @description Profile settings page that allows users to view and update their personal data
 * (first name, last name, age, email) using a controlled form with Zod validation.
 * Also provides an option to delete the account.
 *
 * @example
 * ```tsx
 * import Settings from "@/pages/Settings"
 * 
 * export default function Route() {
 *   return <Settings />
 * }
 * ```
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { deleteProfile, getProfile, updateProfile } from "@/service/profile";

/**
 * Zod schema defining the shape and validation rules for profile data.
 */
const profileSchema = z.object({
  /** User first name. Required, max 50 characters. */
  firstName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  /** User last name. Required, max 50 characters. */
  lastName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  /** User age. Coerced to number and must be at least 18. */
  age: z.coerce.number().min(18, "Debes ser mayor de edad") as z.ZodNumber,
  /** User email. Must be a valid email address. */
  email: z.string().email("Debe ser un correo electrónico válido"),
});

/**
 * Inferred TypeScript type for the user profile based on the Zod schema.
 */
type UserProfile = z.infer<typeof profileSchema>;

/**
 * Profile settings page component.
 *
 * - Fetches the profile on mount and initializes the form.
 * - Validates user input using Zod + react-hook-form.
 * - Submits updates to the backend and displays success/error toasts.
 * - Allows account deletion via a confirmation dialog.
 *
 * @component
 * @returns {JSX.Element} A form-driven profile settings view.
 *
 * @remarks
 * - The `deleteProfile` call currently sends a payload containing `{ user: { userId: email } }`.
 *   Ensure the backend expects this shape (or adjust accordingly) if you implement password confirmation.
 */
export default function Settings() {
  /** Loading state to disable actions and provide user feedback. */
  const [loading, setLoading] = useState(false);
  /** Error message to render within the alert component. */
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * React Hook Form instance configured with Zod resolver and default values.
   */
  const profileForm = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
    },
  });

  /**
   * Loads the profile data on mount and resets the form values.
   * Displays an error toast if the request fails.
   */
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        profileForm.reset(data);
        setError(null);
      } catch {
        setError("No se pudo obtener el perfil");
        toast.error("No se pudo obtener el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [profileForm]);

  /**
   * Handles form submission to update the profile.
   *
   * @param data - The validated profile data collected from the form.
   * @returns {Promise<void>} Resolves when the update flow finishes.
   */
  const onSubmit = async (data: UserProfile) => {
    try {
      setLoading(true);
      setError(null);
      await updateProfile(data);
      toast.success("Perfil actualizado correctamente");
    } catch {
      setError("Error al guardar cambios");
      toast.error("Error al guardar cambios");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles account deletion after user confirmation.
   * On success, clears auth token and navigates to the discovery page.
   *
   * @returns {Promise<void>} Resolves once the deletion flow completes.
   */
  const handleDeleteAccount = async () => {
    const confirmed = confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteProfile({ user: { userId: profileForm.getValues("email") } });
      toast.success("Cuenta eliminada correctamente");
      navigate("/descubre");
    } catch {
      setError("Error al eliminar la cuenta");
      toast.error("Error al eliminar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-white">Configuración de perfil</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
          <CardDescription>Actualiza tu información de perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="firstName">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="Tu nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="lastName">Apellido</FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        placeholder="Tu apellido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="age">Edad</FormLabel>
                    <FormControl>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Tu edad"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Tu correo electrónico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 pt-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  Eliminar cuenta
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}