import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getProfile, updateProfile } from "@/service/profile";

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

type EditProfile = z.infer<typeof editProfileSchema>;

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const editProfileForm = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
    },
  });

  const onSubmit = async (data: EditProfile) => {
    try {
      setLoading(true);
      await updateProfile(data);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        editProfileForm.reset(data);
      } catch {
        toast.error("No se pudo obtener el perfil");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [editProfileForm]);

  return (

    <Card>
      <CardHeader>
        <CardTitle>Información personal</CardTitle>
        <CardDescription>Actualiza tu información de perfil. Mantén tus datos actualizados para una experiencia personalizada.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...editProfileForm}>
          <form onSubmit={editProfileForm.handleSubmit(onSubmit)} className="space-y-4">
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
                        className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
  )
}

export { UpdateProfile }