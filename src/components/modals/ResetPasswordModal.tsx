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

const resetPasswordSchema = z.object({
  username: z.string().email("Debe ser un correo válido"),
})

interface LocationState {
  background?: RouterLocation;
}

export default function ResetPasswordModal() {
  const navigate = useNavigate();
  const location = useLocation() as RouterLocation & { state: LocationState };
  const [loading, setLoading] = useState(false)

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { username: "" },
  })

  const handleClose = () => {
    if (!loading) navigate("/descubre");
  };

  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setLoading(true)
      console.log(values)
      // await resetPassword(values.username)
      navigate("/iniciar-sesion", { state: { background: location } })
      toast.success("Correo enviado correctamente")
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