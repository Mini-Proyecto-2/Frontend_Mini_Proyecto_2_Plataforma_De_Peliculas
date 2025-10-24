import { useEffect, useState } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getProfile } from '@/service/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        // setProfileData(data);
        console.log(data);
        setProfileData({
          first_name: "Ricardo",
          last_name: "Zapata",
          email: "ricardozapatacruz@gmail.com",
          age: 27,
        });
      } catch {
        toast.error("No se pudo obtener el perfil");
      }
    };
    fetchData();
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 mt-16">
      <Card className="border-0 shadow-lg">       
        <CardHeader className="relative pt-0 pb-6">
          {/* Avatar */}
          <div className="flex justify-start ms-5 -mt-10">
            <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
              <AvatarFallback className="bg-primary text-white text-3xl">
                {profileData && getInitials(profileData.first_name, profileData.last_name) }
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
                      {profileData && (
                        <>
                          {profileData.first_name} {profileData.last_name}
                        </>
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
                      {profileData && profileData.email}
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
                      {profileData && profileData.age + " años"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Botón de acción */}
              <div className="mt-6">
                <Button onClick={() => navigate('/configuracion')} className="w-full" size="lg">
                  Editar Perfil
                </Button>
              </div>
            </>
        </CardContent>
      </Card>
    </div>
  );
}