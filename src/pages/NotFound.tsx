import React from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-white.png';

const NotFound: React.FC = () => {

  const handleNavigate = () => {
    window.location.href = '/app';
  }
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      <img src={logo} alt="Logo" className="h-20 object-contain" />
      <section className='flex flex-col items-center space-y-4'>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <Button variant="secondary" size="lg" className="w-fit" onClick={handleNavigate}>Regresar a la página principal</Button>
      </section>
    </div>
  );
};

export default NotFound;
