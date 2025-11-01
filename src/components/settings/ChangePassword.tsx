import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePassword } from "@/service/profile";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;

const changePasswordSchema = z.object({
  /** Current password. Required for verification. */
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  /** New password. Must meet security requirements. */
  newPassword: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(
      passwordRegex,
      "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"
    ),
  /** Confirm new password. Must match new password. */
  confirmPassword: z.string().min(1, "Confirma tu nueva contraseña"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ChangePassword = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePasswordForm = useForm<ChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: ChangePassword) => {
    try {
      setLoading(true);
      await changePassword({currentPassword: data.currentPassword, newPassword: data.newPassword});
      toast.success("Contraseña actualizada correctamente");
      changePasswordForm.reset();
    } catch (error) {
      toast.error("Error al actualizar la contraseña. Verifica que tu contraseña actual sea correcta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>
          Actualiza tu contraseña. Asegúrate de usar una contraseña segura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...changePasswordForm}>
          <form onSubmit={changePasswordForm.handleSubmit(handleChangePassword)} className="space-y-4">
            <FormField
              control={changePasswordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currentPassword">
                    Contraseña actual
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Tu contraseña actual"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newPassword">
                    Nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Tu nueva contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu nueva contraseña"
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
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Cambiar contraseña"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { ChangePassword };