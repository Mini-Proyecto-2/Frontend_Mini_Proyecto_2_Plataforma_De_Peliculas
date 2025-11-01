import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { deleteProfile } from "@/service/profile";
import { logout } from "@/service/auth";

const deleteProfileSchema = z.object({
  /** User email. Must be a valid email address. */
  email: z.string().email("Debe ser un correo electrónico válido"),
  /** User password. Required, min 8 characters. */
  password: z.string().min(8, "Mínimo 8 caracteres").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"),
});

type RemoveProfile = z.infer<typeof deleteProfileSchema>;

const DeleteProfile = () => {
  const [loading, setLoading] = useState(false);

  const deleteProfileForm = useForm<RemoveProfile>({
    resolver: zodResolver(deleteProfileSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDeleteAccount = async (data: RemoveProfile) => {
    const confirmed = confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteProfile({ password: data.password });
      await logout();
      window.location.href = "/";
      toast.success("Cuenta eliminada correctamente");
    } catch (error) {
      toast.error("Error al eliminar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-red-500 border-2">
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
                variant="destructive"
                className="text-white"
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar cuenta"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export { DeleteProfile };