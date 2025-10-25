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

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"),
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

interface LocationState {
  background?: RouterLocation;
}

export default function NewPasswordModal() {
  const navigate = useNavigate();
  const location = useLocation() as RouterLocation & { state: LocationState };
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Si no hay token, redirige al inicio
  useEffect(() => {
    if (!token) {
      toast.error('Token inválido o expirado');
      navigate('/welcome');
    }
  }, [token, navigate]);

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true);
      // Aquí llamas a tu API de resetear contraseña
      // await resetPassword(token!, values.password);
      console.log('Token:', token, 'Nueva contraseña:', values.password);

      toast.success("Contraseña restablecida exitosamente");
      navigate('/descubre', { state: { background: location.state?.background } });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al restablecer contraseña");
      }
    } finally {
      setLoading(false);
    }
  };

  // Si no hay token, no renderiza nada
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