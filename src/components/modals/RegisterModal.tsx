import { Link, useNavigate, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register } from '@/service/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { DialogDescription } from '@radix-ui/react-dialog';

const registerSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  age: z.coerce.number().min(18, "Debes tener al menos 18 años") as z.ZodNumber,
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, "La contraseña debe tener al menos un número, una letra mayúscula, una letra minúscula y un caracter especial"),
})

interface LocationState {
  background?: RouterLocation;
}

export default function RegisterModal() {
  const navigate = useNavigate();
  const location = useLocation() as RouterLocation & { state: LocationState };
  const background = location.state?.background;
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { first_name: "", last_name: "", email: "", age: 18, password: "", confirmPassword: "" },
  })

  const handleClose = () => {
    if (!loading) navigate("/descubre");
  };

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setLoading(true)
      await register({
        firstName: values.first_name,
        lastName: values.last_name,
        age: values.age,
        email: values.email,
        password: values.password,
      })
      navigate("/iniciar-sesion", { state: { background: location } })
      toast.success("Registro exitoso")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al registrar")
      }
    } finally {
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
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FormField
                control={registerForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-primary'>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa apellido"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={registerForm.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Edad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa la contraseña"
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
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa la contraseña"
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
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <p className="text-center text-sm text-primary">
              ¿Ya estás registrado?{" "}
              <Link
                to="/iniciar-sesion"
                state={{ background }}
                className="primary"
              >
                Inicia Sesión
              </Link>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}