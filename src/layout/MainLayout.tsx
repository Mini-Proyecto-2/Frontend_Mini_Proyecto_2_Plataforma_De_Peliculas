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
  Menu,
} from 'lucide-react';
import logo from '@/assets/logo-white.png';
import { Button } from '@/components/ui/button';

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
        <Sidebar className='border-none'>
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
        
        {/* Navbar (solo visible en móvil) */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-primary text-white w-full fixed top-0 left-0 z-50">
          <div className="flex grow justify-between items-center">
            <SidebarTrigger />
            <img src={logo} alt="FilmUnity Logo" className="h-10" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex w-full h-screen">
          <section className="flex-1 ml-0 md:ml-[16rem] mt-14 md:mt-0 p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;