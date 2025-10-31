/**
 * @file WelcomePage.tsx
 * @description Landing (welcome) page for the FilmUnity platform.
 * Introduces users to the app, its core features, and main navigation actions such as login and registration.
 * Designed to be the first impression for new users before they explore or sign in.
 *
 * @example
 * ```tsx
 * import WelcomePage from "@/pages/WelcomePage"
 *
 * export default function Route() {
 *   return <WelcomePage />
 * }
 * ```
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Star, Users, Heart, MessageCircle, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * WelcomePage component.
 *
 * @component
 * @returns {JSX.Element} A full landing page layout showcasing FilmUnity’s purpose and key features.
 *
 * @remarks
 * - Contains navigation to **login** and **register** modal routes.
 * - Introduces FilmUnity’s core features such as playback, community reviews, and favorites.
 * - Uses a modern layout with TailwindCSS and Lucide icons for a cinematic aesthetic.
 */
export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles navigation to a route while preserving the background location.
   * This allows modals (like login/register) to appear on top of the current page.
   *
   * @param path - Route path to navigate to (e.g., "/iniciar-sesion").
   */
  const handleOpenModal = (path: string) => {
    navigate(path, { state: { background: location } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header/Navbar */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">FilmUnity</span>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                className="text-white hover:border-white hover:rounded-10"
                onClick={() => handleOpenModal('/iniciar-sesion')}
              >
                Iniciar Sesión
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleOpenModal('/registrarse')}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            El cine nos une
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre, valora y comenta las mejores películas. 
            Tu plataforma de streaming donde el cine cobra vida.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
            onClick={() => handleOpenModal('/iniciar-sesion')}
          >
            <Play className="mr-2 h-5 w-5" />
            Comenzar ahora
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                  <Play className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Reproduce películas
                </h3>
                <p className="text-gray-400">
                  Disfruta de un amplio catálogo de películas con reproductor integrado
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Valora y comenta
                </h3>
                <p className="text-gray-400">
                  Comparte tu opinión y descubre qué piensan otros usuarios
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Comunidad activa
                </h3>
                <p className="text-gray-400">
                  Únete a miles de amantes del cine de todo el mundo
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Favoritos personalizados
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Guarda tus películas favoritas y accede a ellas cuando quieras
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Comentarios y reseñas
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Lee y escribe comentarios sobre tus películas favoritas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Links */}
        <div className="mt-20 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <a href="/sobre-nosotros#about" className="hover:text-white transition-colors">
              Sobre nosotros
            </a>
            <a href="/mapa-sitio" className="hover:text-white transition-colors">
              Mapa del sitio
            </a>
            <a href="/sobre-nosotros#contact" className="hover:text-white transition-colors">
              Contacto
            </a>
            <a href="/sobre-nosotros#help" className="hover:text-white transition-colors">
              Ayuda
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 FilmUnity. El cine nos une.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}