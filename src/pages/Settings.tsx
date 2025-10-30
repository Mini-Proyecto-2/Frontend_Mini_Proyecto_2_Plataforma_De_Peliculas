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
const editProfileSchema = z.object({
  /** User first name. Required, max 50 characters. */
  firstName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  /** User last name. Required, max 50 characters. */
  lastName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  /** User age. Coerced to number and must be at least 18. */
  age: z.coerce.number().min(18, "Debes ser mayor de edad") as z.ZodNumber,
  /** User email. Must be a valid email address. */
  email: z.string().email("Debe ser un correo electrónico válido"),
});

const deleteProfileSchema = z.object({
  /** User email. Must be a valid email address. */
  email: z.string().email("Debe ser un correo electrónico válido"),
  /** User password. Required, min 8 characters. */
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

/**
 * Inferred TypeScript type for the user profile based on the Zod schema.
 */
type EditProfile = z.infer<typeof editProfileSchema>;
type DeleteProfile = z.infer<typeof deleteProfileSchema>;

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
  const editProfileForm = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
    },
  });

  const deleteProfileForm = useForm<DeleteProfile>({
    resolver: zodResolver(deleteProfileSchema),
    defaultValues: {
      email: "",
      password: "",
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
        editProfileForm.reset(data);
        setError(null);
      } catch {
        setError("No se pudo obtener el perfil");
        toast.error("No se pudo obtener el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [editProfileForm]);

  /**
   * Handles form submission to update the profile.
   *
   * @param data - The validated profile data collected from the form.
   * @returns {Promise<void>} Resolves when the update flow finishes.
   */
  const onSubmit = async (data: EditProfile) => {
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
  const handleDeleteAccount = async (data: DeleteProfile) => {
    const confirmed = confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteProfile(data);
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
    <div className="p-6 w-full">
      <h1 className="font-bold mb-8">Configuración</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-8 justify-center sm:flex-row flex-col">
        <Card className="sm:max-w-[400px] max-w-full sm:w-1/2 w-full">
          <CardHeader>
            <CardTitle>Información personal</CardTitle>
            <CardDescription>Actualiza tu información de perfil. Mantén tus datos actualizados para una experiencia personalizada.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...editProfileForm}>
              <form onSubmit={editProfileForm.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={editProfileForm.control}
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
                    control={editProfileForm.control}
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
                </div>
                <div className="flex gap-4">

                  <FormField
                    control={editProfileForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="w-1/6">
                        <FormLabel htmlFor="age">Edad</FormLabel>
                        <FormControl>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Tu edad"
                            {...field}
                            defaultValue={0}
                            min={18}
                            max={120}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editProfileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-5/6">
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
                </div>

                <div className="flex gap-4 pt-2 justify-end">
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
        <Card className="border-red-500 border-2 max-w-full sm:max-w-[400px] sm:w-1/2">
          <CardHeader>
            <CardTitle className="text-red-500">Atención</CardTitle>
            <CardDescription className="text-red-500">
              Al eliminar tu cuenta perderás todos tus datos y no podrás volver a
              acceder a ellos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...deleteProfileForm}>
              <form onSubmit={deleteProfileForm.handleSubmit(handleDeleteAccount)} className="space-y-4">
                <FormField
                  control={deleteProfileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-red-500">
                      <FormLabel htmlFor="deleteEmail">
                        Confirma tu correo electrónico para eliminar tu cuenta
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="deleteEmail"
                          type="email"
                          placeholder="Confirma tu correo electrónico"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={deleteProfileForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-red-500">
                      <FormLabel htmlFor="deletePassword">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="deletePassword"
                          type="password"
                          placeholder="Tu contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 pt-2 justify-end">
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-red-500"
                    disabled={loading}
                  >
                    {loading ? "Eliminando..." : "Eliminar cuenta"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}