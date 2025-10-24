import { NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { LogOutIcon, User, UserCircleIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const MainLayout = () => {
  const { authLogout } = useAuth()

  const handleLogout = () => {
    authLogout()
    toast.success("Sesión cerrada exitosamente")
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-sm pt-4">
        <div className="max-w-7xl flex justify-between mx-auto px-4 pb-2">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="full_logo.svg"
                alt="Logo TaskFlow DS"
                className="h-8 object-contain"
              />
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">Inicio</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/tareas">Mis Tareas</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <UserCircleIcon className="size-4" />
                    <span>John Doe</span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-max">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/perfil" className="flex-row items-center gap-2">
                          <User className="size-4" />
                          Perfil
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/descubre" className="flex-row items-center gap-2" onClick={() => handleLogout()}>
                          <LogOutIcon className="size-4" />
                          Cerrar sesión
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
