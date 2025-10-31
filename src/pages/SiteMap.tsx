/**
 * @file SiteMapPage.tsx
 * @description Displays a site map (sitemap) of all main sections and pages of the FilmUnity application.
 * Organized into cards that group related routes such as main pages, user features, community, and information.
 *
 * @example
 * ```tsx
 * import SiteMapPage from "@/pages/SiteMapPage"
 *
 * export default function Route() {
 *   return <SiteMapPage />
 * }
 * ```
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Home, LogIn, User, Heart, MessageCircle, Settings, HelpCircle, Clapperboard, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import type { JSX } from 'react';

/**
 * SiteMapPage component.
 *
 * @component
 * @returns {JSX.Element} A responsive sitemap view showing all available sections and navigation links in the app.
 *
 * @remarks
 * - The sitemap is divided into 4 sections: Main Pages, User, Community, and Information.
 * - Each section includes related links represented with icons and grouped in a card.
 * - This page enhances accessibility and provides an overview of FilmUnity’s navigation structure.
 */
export default function SiteMapPage(): JSX.Element {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  /**
   * Defines the structure of the sitemap — each section contains:
   * - a title,
   * - an icon for the category,
   * - and a list of navigation links (each with its own icon and path).
   */
  const sections = [
    {
      title: "Páginas principales",
      icon: Home,
      links: [
        { name: "Inicio", path: "/", icon: Home, auth: 'both' },
        { name: "Catálogo de películas", path: "/", icon: Film, auth: 'user' },
        { name: "Mis favoritos", path: "/favoritos", icon: Heart, auth: 'user' },
      ]
    },
    {
      title: "Usuario",
      icon: User,
      links: [
        { name: "Iniciar sesión", path: "/iniciar-sesion", icon: LogIn, auth: 'all' },
        { name: "Registrarse", path: "/registrarse", icon: UserPlus, auth: 'all' },
        { name: "Mi perfil", path: "/perfil", icon: User, auth: 'user' },
        { name: "Configuración", path: "/configuracion", icon: Settings, auth: 'user' },
      ]
    },
    {
      title: "Información",
      icon: HelpCircle,
      links: [
        { name: "Sobre nosotros", path: "/sobre-nosotros#about", icon: HelpCircle, auth: 'both' },
        { name: "Contacto", path: "/sobre-nosotros#contact", icon: MessageCircle, auth: 'both' },
        { name: "Ayuda", path: "/sobre-nosotros#help", icon: HelpCircle, auth: 'both' },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Clapperboard className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">FilmUnity</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="text-white">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mapa del Sitio
          </h1>
          <p className="text-xl text-gray-300">
            Explora todas las secciones de FilmUnity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon className="h-5 w-5 text-blue-500" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.links.filter((link) => (link.auth === 'both' || (link.auth === 'user' && isLoggedIn) || (link.auth === 'all' && !isLoggedIn))).map((link) => {
                      const LinkIcon = link.icon;
                      if (['both', 'user'].includes(link.auth)) {
                        return (
                          <li key={link.path}>
                            <Link
                              to={link.path}
                              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                              <LinkIcon className="h-4 w-4" />
                              {link.name}
                            </Link>
                          </li>
                        );
                      } else {
                        return (
                          <li key={link.path}>
                            <p
                              onClick={() => navigate(link.path, { state: { background: location } })}
                              className="text-white hover:cursor-pointer hover:underline flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                              <LinkIcon className="h-4 w-4" />
                              {link.name}
                            </p>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
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