/**
 * @file MainLayout Component
 * @description Main application layout component with responsive sidebar navigation.
 * Provides the primary structure for authenticated pages in Film Unity app.
 * Includes navigation menu, user actions, and responsive mobile header.
 * 
 * Features:
 * - Responsive sidebar (desktop: fixed, mobile: sheet/drawer)
 * - User authentication integration
 * - Navigation with active state
 * - Logout functionality
 * - Logo branding
 * - Mobile-optimized header
 * - Nested routing via Outlet
 * 
 * @module MainLayout
 */

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
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import logo from '@/assets/logo-white.png';

/**
 * Top-level layout that provides the app navigation, mobile header,
 * and the main content region where child routes are rendered.
 *
 * @component
 * @returns The application layout surrounding nested routes.
 */
const MainLayout = () => {
  const { authLogout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles user sign out:
   * - Calls the `authLogout` context action
   * - Shows a success toast
   * - Redirects to the home route `/`
   */
  const handleLogout = async () => {
    await authLogout();
    toast.success("Sesión cerrada exitosamente");
    navigate('/');
  };

  /**
   * Primary navigation entries displayed in the sidebar.
   */
  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/' },
    { icon: User, label: 'Perfil', href: '/perfil' },
    { icon: Heart, label: 'Favoritos', href: '/favoritos' },
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

        <header className="fixed w-full top-0 left-0 z-50 bg-slate-900/50 lg:hidden ">
          <div className="flex items-center justify-between py-2 px-8">
            <SidebarTrigger className='bg-white text-primary hover:bg-white/80'/>
            <img src={logo} alt="FilmUnity Logo" className="h-12" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex w-full h-screen">
          <section className="flex-1 ml-0 lg:ml-[16rem] lg:mt-0 mt-16 p-8 overflow-y-auto">
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;