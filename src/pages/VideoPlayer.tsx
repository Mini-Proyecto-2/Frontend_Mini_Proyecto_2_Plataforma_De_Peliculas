/**
 * @file VideoPlayer.tsx
 * @description Página de reproductor de video en pantalla completa.
 * Muestra un video individual en pantalla completa con controles.
 * 
 * @component
 * @returns {JSX.Element} Reproductor de video en pantalla completa.
 */

import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { PexelsVideo } from "@/types/pexels";
import { extractTitleFromUrl } from "@/lib/movie";

/**
 * Componente de página de reproductor de video.
 * Recibe un video a través del state de navegación y lo muestra en pantalla completa.
 * 
 * @returns {JSX.Element} Vista de reproductor de video con controles y navegación.
 */
export default function VideoPlayer() {
  const [video, setVideo] = useState<PexelsVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const hideControlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Obtener el video desde el state de navegación
    const videoFromState = location.state?.video as PexelsVideo | undefined;

    if (videoFromState) {
      setVideo(videoFromState);
      setLoading(false);
    } else {
      toast.error("No se proporcionó ningún video");
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    // Limpiar timeout al desmontar el componente
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Maneja el movimiento del mouse para mostrar/ocultar controles.
   */
  const handleMouseMove = () => {
    setShowControls(true);

    // Limpiar timeout anterior
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    // Ocultar controles después de 3 segundos de inactividad
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  /**
   * Maneja cuando el mouse sale del área.
   */
  const handleMouseLeave = () => {
    setShowControls(false);
  };

  /**
   * Navega de regreso a la página anterior.
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Spinner className="size-[3rem] text-white" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <p className="text-xl mb-4">No hay video disponible</p>
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/20"
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: showControls ? 'default' : 'none' }}
    >
      {/* Reproductor de video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-black">
          {video.video_files && video.video_files.length > 0 && (
            <video
              key={video.id}
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={video.image}
            >
              <source src={video.video_files[0].link} type={video.video_files[0].file_type} />
              Tu navegador no soporta el elemento de video.
            </video>
          )}
        </div>
      </div>

      {/* Capa de overlay para controles personalizados - no interfiere con el video */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Botón de regreso - con transición suave */}
        <Button
          onClick={handleGoBack}
          variant="ghost"
          size="icon"
          className={`absolute top-4 left-4 z-50 hover:bg-gray-800/60 rounded-lg hover:backdrop-blur-md transition-all duration-300 pointer-events-auto ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          aria-label="Volver"
        >
          <ArrowLeft className="text-white" />
        </Button>

        {/* Título de la vista - con transición suave */}
        <div
          className={`absolute top-4 right-4 z-40 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
        >
          <section className="text-end px-4 py-2 bg-primary/20 backdrop-blur-md rounded-bl-lg">
            <p className="text-sm">{video.user.name}</p>
            <p className="text-lg font-bold">{extractTitleFromUrl(video.url)}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

