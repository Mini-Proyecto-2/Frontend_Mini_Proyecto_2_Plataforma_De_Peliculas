"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Film } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

const loginSchema = z.object({
  username: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

const registerSchema = z.object({
  first_name: z.string().min(2, "El nombre es obligatorio"),
  last_name: z.string().min(2, "El apellido es obligatorio"),
  age: z.string().min(1, "La edad es obligatoria"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { authLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // Forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      first_name: "", 
      last_name: "", 
      age: "", 
      email: "", 
      password: "",
      confirmPassword: ""
    },
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
        first_name: values.first_name,
        last_name: values.last_name,
        age: parseInt(values.age),
        email: values.email,
        password: values.password,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-5xl bg-slate-800/50 backdrop-blur-xl border-slate-700 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="flex-1 p-8 md:p-12">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <Film className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">FilmUnity</h1>
              <p className="text-gray-400">El cine nos une</p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-8">
              <Button
                onClick={() => setIsLogin(true)}
                variant={isLogin ? "default" : "ghost"}
                className={`flex-1 ${
                  isLogin
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                Inicio Sesión
              </Button>
              <Button
                onClick={() => setIsLogin(false)}
                variant={!isLogin ? "default" : "ghost"}
                className={`flex-1 ${
                  !isLogin
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                Registrarse
              </Button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Correo electrónico</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa el correo electrónico"
                            {...field}
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500"
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
                        <FormLabel className="text-gray-300">Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa la contraseña"
                              {...field}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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

                  <div className="text-right">
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                      Recuperar Contraseña
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
                  >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </Button>

                  <p className="text-center text-sm text-gray-400">
                    ¿No tienes cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Regístrate
                    </button>
                  </p>
                </form>
              </Form>
            ) : (
              /* Register Form */
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Nombre</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa nombre"
                              {...field}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500"
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
                          <FormLabel className="text-gray-300">Apellido</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ingresa apellido"
                              {...field}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500"
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
                        <FormLabel className="text-gray-300">Edad</FormLabel>
                        <FormControl>
                          <Input
                          type="number"
                            placeholder="ej: 20"
                            {...field}
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500"
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
                        <FormLabel className="text-gray-300">Correo electrónico</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingresa el correo electrónico"
                            {...field}
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500"
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
                        <FormLabel className="text-gray-300">Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa la contraseña"
                              {...field}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                        <FormLabel className="text-gray-300">Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Ingresa la contraseña"
                              {...field}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-blue-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
                  >
                    {loading ? "Registrando..." : "Registrarse"}
                  </Button>

                  <p className="text-center text-sm text-gray-400">
                    ¿Ya estás registrado?{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Inicia Sesión
                    </button>
                  </p>
                </form>
              </Form>
            )}
          </div>

          {/* Right Side - Image/Background */}
          <div className="hidden md:block md:flex-1 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex items-center justify-center p-12">
              <div className="text-center text-white space-y-4">
                <Film className="h-24 w-24 mx-auto mb-8 opacity-80" />
                <h2 className="text-4xl font-bold">Bienvenido a</h2>
                <h3 className="text-5xl font-bold">FilmUnity</h3>
                <p className="text-xl opacity-90 mt-4">
                  Tu plataforma de películas favorita
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-white/10 blur-xl" />
            <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
          </div>
        </div>
      </Card>
    </div>
  )
}
