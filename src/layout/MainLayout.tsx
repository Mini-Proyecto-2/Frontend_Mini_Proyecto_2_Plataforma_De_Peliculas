import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Heart,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  Search,
  Bell,
} from 'lucide-react';
import logo from '@/assets/logo-white.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MainLayout = () => {
  const { authLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    toast.success("Sesión cerrada exitosamente");
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: Heart, label: 'Favoritos', href: '/favoritos' },
    { icon: Star, label: 'Calificaciones', href: '/calificaciones' },
    { icon: MessageCircle, label: 'Comentarios', href: '/comentarios' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar className='border-none z-2'>
          <SidebarHeader className="px-6">
            <img src={logo} alt="FilmUnity Logo" className="h-20" />
          </SidebarHeader>

          <SidebarContent className="px-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className='space-y-1'>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        className="text-white hover:bg-white/10 data-[active=true]:bg-white/20"
                      >
                        <Link to={item.href} className="flex items-center gap-4 py-3 hover:outline-none">
                          <item.icon className="h-8 w-8" />
                          <span className="text-md">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className='space-y-1'>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-white hover:bg-white/10"
                    >
                      <Link to="/configuracion" className="flex items-center gap-4 py-3">
                        <Settings className="h-8 w-8" />
                        <span className="text-md">Configuración</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleLogout}
                      className="text-white hover:bg-white/10 hover:text-white hover:cursor-pointer flex items-center gap-4 py-3"
                    >
                      <LogOut className="h-8 w-8" />
                      <span className="text-md">Cerrar Sesión</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>

        <header className="fixed top-0 left-0 w-full z-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between md:justify-end p-4 gap-4">
            <SidebarTrigger className='md:hidden' />
            {/* Íconos y perfil */}
            <div className="flex items-center gap-6">
              {/* Buscar */}
              <Link to="/busqueda">
                <Search />
              </Link>

              {/* Notificaciones */}
              <Link to="/notificaciones">
                <Bell />
              </Link>

              {/* Perfil */}
              <div className="flex items-center gap-4 cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/123456?v=3" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-white font-medium ellipsis">Ricardo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex w-full h-screen">
          <section className="flex-1 ml-0 md:ml-[16rem] mt-8 p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;