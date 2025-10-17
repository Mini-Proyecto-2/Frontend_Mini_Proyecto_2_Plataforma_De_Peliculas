"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { login, register } from "@/service/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

const departments = [
  { value: "1", label: "Recursos Humanos" },
  { value: "2", label: "Tecnología" },
  { value: "3", label: "Ventas" },
  { value: "4", label: "Marketing" },
  { value: "5", label: "Finanzas" },
  { value: "6", label: "Operaciones" },
]

const loginSchema = z.object({
  username: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

const registerSchema = z.object({
  first_name: z.string().min(2, "El nombre es obligatorio"),
  last_name: z.string().min(2, "El apellido es obligatorio"),
  age: z.number().min(18, "Debes ser mayor de edad"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { authLogin } = useAuth()
  const [loading, setLoading] = useState(false)

  // Forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { first_name: "", last_name: "", age: 0, email: "", password: ""},
  })

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true)
      const token = await login(values.username, values.password)
      authLogin(token)
      navigate("/")
      toast.success("Inicio de sesión exitoso")
    } catch {
      toast.error("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setLoading(true)
      const token = await register({
        ...values,
      })
      authLogin(token)
      navigate("/")
      toast.success("Registro exitoso")
    } catch {
      toast.error("Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl h-[80vh] flex flex-col md:flex-row shadow-lg">
      <div className="flex-[2] px-8">
        <h1 className="text-2xl font-bold mb-2 text-center">TaskFlow</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Administra tus tareas de manera eficiente
        </p>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          {/* Login */}
          <TabsContent value="login" className="mt-8">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} />
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
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button className="w-2/3 mt-8 cursor-pointer" type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Registro */}
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4">
                  <FormField
                    control={registerForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
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
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu apellido" {...field} />
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
                        <FormLabel>Edad</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu edad" {...field} />
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
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} />
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
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="flex justify-center">
                  <Button className="w-2/3 cursor-pointer" type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex-[2] hidden md:flex">
        <img
          src="/imagen.png"
          alt="Ilustración de inicio de sesión"
          className="w-full h-full object-cover"
        />
      </div>
    </Card>
  )
}
