/**
 * @file NotFound.tsx
 * @description Displays a 404 "Page Not Found" screen for undefined routes.
 * Includes a logo, error message, and a button to navigate back to the homepage.
 *
 * @example
 * ```tsx
 * import NotFound from "@/pages/NotFound"
 *
 * // In React Router
 * <Route path="*" element={<NotFound />} />
 * ```
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-white.png';

/**
 * 404 page component shown when no matching route is found.
 *
 * @component
 * @returns {JSX.Element} A centered layout showing the 404 message and a navigation button.
 *
 * @remarks
 * - Uses the `Button` UI component for consistent styling.
 * - Navigates back to `/` when the button is clicked.
 */
const NotFound: React.FC = () => {
  /**
   * Redirects the user to the homepage.
   * Triggered when clicking the "Go back" button.
   */
  const handleNavigate = () => {
    window.location.href = '/';
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
