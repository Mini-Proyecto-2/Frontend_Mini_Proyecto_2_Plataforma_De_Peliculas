/**
 * @file Profile.tsx
 * @description Renders the user's profile page with basic information (full name, email, age)
 * fetched from the backend. Displays an avatar with the user's initials and a button
 * to navigate to the settings/edit profile screen.
 *
 * @example
 * ```tsx
 * import Profile from "@/pages/Profile"
 * 
 * export default function ProfileRoute() {
 *   return <Profile />
 * }
 * ```
 */

import { useEffect, useState } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getProfile } from '@/service/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Shape of the profile object returned by the API.
 */
interface Profile {
  /** User first name. */
  firstName: string;
  /** User last name. */
  lastName: string;
  /** User email address. */
  email: string;
  /** User age in years. */
  age: number;
}

/**
 * Profile page component.
 *
 * - Fetches user data on mount via `getProfile`.
 * - Shows initials-based avatar (fallback).
 * - Displays name, email, and age inside UI cards.
 * - Provides a CTA to navigate to the configuration/edit screen.
 *
 * @component
 * @returns {JSX.Element} The profile view with user details and edit action.
 */
export default function Profile() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch {
        toast.error("No se pudo obtener el perfil");
      }
    };
    fetchData();
  }, []);

  /**
   * Builds the initials string to be rendered in the avatar fallback.
   *
   * @param firstName - User first name.
   * @param lastName - User last name.
   * @returns Uppercased initials (e.g., "MT" for "Mauricio Teherán").
   */
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container w-full p-6">
      <h1 className="font-bold">Perfil</h1>
      <Card className="border-0 shadow-lg mt-16 w-2/3 mx-auto px-4">
        <CardHeader className="relative pt-0 pb-6">
          {/* Avatar */}
          <div className="flex justify-start ms-5 -mt-10">
            <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
              <AvatarFallback className="bg-primary text-white text-3xl">
                {profileData ? getInitials(profileData.firstName, profileData.lastName) : <Spinner className="w-12 h-12" />}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-6 pb-6">
          <>
            {/* Tarjetas de información */}
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">Nombre completo</p>
                  <p className="text-foreground font-semibold">
                    {profileData ? (
                      <>
                        {profileData.firstName} {profileData.lastName}
                      </>
                    ) : (
                      <Skeleton className="w-60 h-4 mt-2" />
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">Correo electrónico</p>
                  <p className="text-foreground font-semibold">
                    {profileData ? (
                      profileData.email
                    ) : (
                      <Skeleton className="w-60 h-4 mt-2" />
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground font-medium">Edad</p>
                  <p className="text-foreground font-semibold">
                    {profileData ? profileData.age + " años" : <Skeleton className="w-24 h-6" />}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Botón de acción */}
            <div className="flex justify-end mt-6">
              <Button onClick={() => navigate('/configuracion')} size="lg">
                Editar Perfil
              </Button>
            </div>
          </>
        </CardContent>
      </Card>
    </div>
  );
}