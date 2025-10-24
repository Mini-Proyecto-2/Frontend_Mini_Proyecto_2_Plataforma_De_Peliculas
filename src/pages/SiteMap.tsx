import { Link } from 'react-router-dom';
import { Film, Home, LogIn, User, Heart, MessageCircle, Settings, HelpCircle, Clapperboard, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SiteMapPage() {
  const sections = [
    {
      title: "Páginas principales",
      icon: Home,
      links: [
        { name: "Inicio", path: "/descubre", icon: Home },
        { name: "Catálogo de películas", path: "/peliculas", icon: Film },
        { name: "Mis favoritos", path: "/favoritos", icon: Heart },
      ]
    },
    {
      title: "Usuario",
      icon: User,
      links: [
        { name: "Iniciar sesión", path: "/iniciar-sesion", icon: LogIn },
        { name: "Registrarse", path: "/registrarse", icon: UserPlus },
        { name: "Mi perfil", path: "/perfil", icon: User },
        { name: "Configuración", path: "/configuracion", icon: Settings },
      ]
    },
    {
      title: "Comunidad",
      icon: MessageCircle,
      links: [
        { name: "Comentarios", path: "/comentarios", icon: MessageCircle },
        { name: "Valoraciones", path: "/valoraciones", icon: Heart },
      ]
    },
    {
      title: "Información",
      icon: HelpCircle,
      links: [
        { name: "Sobre nosotros", path: "/sobre-nosotros", icon: HelpCircle },
        { name: "Ayuda", path: "/ayuda", icon: HelpCircle },
        { name: "Contacto", path: "/contacto", icon: MessageCircle },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {section.links.map((link) => {
                      const LinkIcon = link.icon;
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