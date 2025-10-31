/**
 * @file InfoPage.tsx
 * @description Page component that displays information sections for "About Us", "Contact", and "Help".
 * This page provides users with key information about FilmUnity, how to contact the team,
 * and frequently asked questions to help them use the platform.
 *
 * @example
 * ```tsx
 * import InfoPage from "@/pages/InfoPage"
 *
 * export default function Route() {
 *   return <InfoPage />
 * }
 * ```
 */

import { Info, Mail, Phone, MapPin, HelpCircle, Film, Users, Star, Clapperboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * InfoPage component.
 *
 * @component
 * @description Displays three main sections accessible via tabs:
 * - **Sobre nosotros**: Information about FilmUnity's mission and values
 * - **Contacto**: Contact information and ways to reach the team
 * - **Ayuda**: Frequently asked questions and help topics
 *
 * @returns {JSX.Element} The info page with tabbed navigation between sections.
 *
 * @remarks
 * - Uses Tabs component for navigation between sections
 * - Consistent with FilmUnity's design language (blue accent, dark theme)
 * - Includes icons from lucide-react for visual hierarchy
 * - Automatically selects the appropriate tab based on the current route
 */
export default function InfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('about');

  /**
   * Determines which tab should be active based on the current pathname.
   * Maps route paths to their corresponding tab values.
   */
  useEffect(() => {
    const path = location.pathname;

    if (path.includes('sobre-nosotros')) {
      setActiveTab('about');
    } else if (path.includes('contacto')) {
      setActiveTab('contact');
    } else if (path.includes('ayuda')) {
      setActiveTab('help');
    } else {
      setActiveTab('about');
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Header con logo FilmUnity */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-slate-800/50 transition-colors"
            >
              <Clapperboard className="h-7 w-7 text-blue-400" />
              <span className="text-xl font-bold text-blue-400">FilmUnity</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Información</h1>
          <p className="text-xl text-gray-200">
            Todo lo que necesitas saber sobre FilmUnity
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-[#4a5c6a] h-auto p-0 mb-8 rounded-none">
            <TabsTrigger
              value="about"
              className="flex items-center justify-center gap-2 bg-transparent border-b-3 border-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 text-blue-400 rounded-none px-4 py-3 hover:bg-[#2c3945]/30 transition-all"
            >
              <Info className="w-4 h-4" />
              Sobre nosotros
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center justify-center gap-2 bg-transparent border-b-3 border-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 text-blue-400 rounded-none px-4 py-3 hover:bg-[#2c3945]/30 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contacto
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="flex items-center justify-center gap-2 bg-transparent border-b-3 border-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 text-blue-400 rounded-none px-4 py-3 hover:bg-[#2c3945]/30 transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              Ayuda
            </TabsTrigger>
          </TabsList>

        {/* About Us */}
        <TabsContent value="about" className="space-y-6">
          <Card className="bg-[#2c3945] border-[#4a5c6a] backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl text-white">
                <Film className="w-7 h-7 text-blue-500" />
                Sobre FilmUnity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                FilmUnity es una plataforma de streaming diseñada para unir a los amantes del cine
                de todo el mundo. Nuestra misión es crear una comunidad donde las personas puedan
                descubrir, disfrutar y compartir su pasión por las películas.
              </p>

              <Separator className="bg-[#4a5c6a]" />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Star className="w-6 h-6 text-blue-500" />
                  Nuestra Misión
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">
                  Hacer que el cine sea accesible para todos, proporcionando una plataforma
                  intuitiva donde los usuarios puedan explorar un vasto católogo de películas,
                  compartir sus opiniones y conectarse con otros cinéfilos.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Users className="w-6 h-6 text-blue-500" />
                  Nuestra Comunidad
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">
                  Creemos en el poder de la comunidad. FilmUnity no es solo una plataforma de
                  streaming, es un espacio donde las personas pueden expresar sus opiniones,
                  descubrir nuevas perspectivas y encontrar películas que realmente les importan.
                </p>
              </div>

              <Separator className="bg-[#4a5c6a]" />

              <div className="bg-[#4a5c6a]/60 border border-[#607d8b] p-5 rounded-lg">
                <p className="text-base font-medium text-blue-100">
                  "El cine nos une" - Este es nuestro lema y la razón por la que existimos.
                  Cada película cuenta una historia, y cada historia merece ser compartida.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="bg-[#2c3945] border-[#4a5c6a] backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl text-white">
                <Mail className="w-7 h-7 text-blue-500" />
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">
                Estamos aquí para ayudarte. Si tienes preguntas, sugerencias o necesitas soporte,
                no dudes en contactarnos a través de cualquiera de estos medios.
              </p>

              <div className="space-y-4">
                <Card className="bg-[#37485a]/80 border-[#4a5c6a] shadow-lg hover:bg-[#37485a] transition-all">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-medium">Correo electrónico</p>
                      <p className="text-white font-semibold text-lg">soporte@filmunity.com</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Respuesta en 24-48 horas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#37485a]/80 border-[#4a5c6a] shadow-lg hover:bg-[#37485a] transition-all">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-medium">Teléfono</p>
                      <p className="text-white font-semibold text-lg">+57 (1) 234-5678</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#37485a]/80 border-[#4a5c6a] shadow-lg hover:bg-[#37485a] transition-all">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 font-medium">Dirección</p>
                      <p className="text-white font-semibold text-lg">
                        Calle 123 #45-67, Edificio FilmUnity
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Cali, Colombia
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-[#4a5c6a]" />

              <div className="bg-[#37485a]/50 border border-[#4a5c6a] p-5 rounded-lg">
                <h4 className="font-semibold mb-2 text-white text-lg">Redes Sociales</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades
                </p>
                <div className="flex gap-4 text-sm">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors"
                  >
                    Facebook
                  </a>
                  <span className="text-gray-500">•</span>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors"
                  >
                    Twitter
                  </a>
                  <span className="text-gray-500">•</span>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help */}
        <TabsContent value="help" className="space-y-6">
          <Card className="bg-[#2c3945] border-[#4a5c6a] backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-3xl text-white">
                <HelpCircle className="w-7 h-7 text-blue-500" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿Cómo creo una cuenta en FilmUnity?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Para crear una cuenta, haz clic en el botón "Registrarse" en la página principal.
                    Completa el formulario con tu nombre, correo electrónico y edad. Recibirás un
                    correo de confirmación para activar tu cuenta.
                  </p>
                </div>

                <Separator className="bg-[#4a5c6a]" />

                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿Cómo puedo ver una película?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Una vez que hayas iniciado sesión, explora nuestro católogo desde el dashboard.
                    Haz clic en cualquier película para ver su información detallada y luego presiona
                    el botón "Reproducir" para comenzar a verla.
                  </p>
                </div>

                <Separator />

                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿Puedo calificar y comentar películas?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sí, todos los usuarios registrados pueden calificar películas con estrellas y
                    dejar comentarios. Tus opiniones ayudan a otros usuarios a descubrir contenido
                    de calidad.
                  </p>
                </div>

                <Separator />

                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿Cómo agrego películas a mis favoritos?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    En la página de cada película, encontrarás un botón de corazón. Haz clic en él
                    para agregar la película a tu lista de favoritos. Puedes acceder a tus favoritos
                    desde tu perfil en cualquier momento.
                  </p>
                </div>

                <Separator />

                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿Olvidé mi contraseña, qué hago?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?".
                    Ingresa tu correo electrónico y recibirás instrucciones para restablecer tu
                    contraseña.
                  </p>
                </div>

                <Separator />

                <div className="border-l-4 border-blue-500 pl-5 py-3 bg-[#37485a]/40 rounded-r-lg">
                  <h3 className="font-semibold text-xl mb-2 text-white">
                    ¿La plataforma es gratuita?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sí, FilmUnity es completamente gratuita. Creemos que el cine debe ser accesible
                    para todos, por eso no cobramos por el acceso a nuestro catálogo de películas.
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-[#4a5c6a]" />

              <div className="bg-[#4a5c6a]/60 border border-[#607d8b] p-5 rounded-lg">
                <p className="text-base font-medium mb-2 text-white">¿No encontraste lo que buscabas?</p>
                <p className="text-sm text-gray-300">
                  Si tienes alguna pregunta adicional, no dudes en contactarnos a través de la
                  sección de{' '}
                  <span
                    onClick={() => setActiveTab('contact')}
                    className="font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors"
                  >
                    Contacto
                  </span>
                  . Estaremos encantados de ayudarte.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
