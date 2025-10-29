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

const profileSchema = z.object({
  firstName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  lastName: z.string().min(1, "Este campo es obligatorio").max(50, "Máximo 50 caracteres"),
  age: z.coerce.number().min(18, "Debes ser mayor de edad") as z.ZodNumber,
  email: z.string().email("Debe ser un correo electrónico válido"),
});

type UserProfile = z.infer<typeof profileSchema>;

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const profileForm = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
    },
  });

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