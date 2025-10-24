import { Link, useNavigate, useLocation, type Location as RouterLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '../ui/form';
import { FormField } from '../ui/form';
import { FormItem } from '../ui/form';
import { FormLabel } from '../ui/form';
import { FormControl } from '../ui/form';
import { FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/service/auth';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { DialogDescription } from '@radix-ui/react-dialog';
import logo from '@/assets/logo.png';

const loginSchema = z.object({
  username: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

interface LocationState {
  background?: RouterLocation;
}

export default function LoginModal() {
  const { authLogin } = useAuth()
  const navigate = useNavigate();
  const location = useLocation() as RouterLocation & { state: LocationState };
  const background = location.state?.background;
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const handleClose = () => {
    navigate("/");
  };

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true)
      const token = await login(values.username, values.password)
      authLogin(token)
      navigate("/dashboard")
      toast.success("Inicio de sesión exitoso")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al iniciar sesión")
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
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
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

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-primary">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
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
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>

            <p className="text-center text-sm text-primary">
              ¿Olvidaste tu contraseña?{" "}
              <Link
                to="/recuperar-contraseña"
                state={{ background }}
                className="primary"
              >
                Recupera tu contraseña
              </Link>
            </p>

            <p className="text-center text-sm text-primary">
              ¿No tienes cuenta?{" "}
              <Link
                to="/registrarse"
                state={{ background }}
                className="primary"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}