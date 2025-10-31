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

type VideoFile = {
  id: number;
  quality: string;
  file_type: string;
  width: number | null;
  height: number | null;
  link: string;
}

type VideoPicture = {
  id: number;
  picture: string;
  nr: number;
}

type Video = {
  id: number;
  width: number;
  height: number;
  url: string;
  duration: number;
  image: string;
  video_files: VideoFile[];
  video_pictures?: VideoPicture[];
  user: {
    id: number;
    name: string;
    url: string;
  };
}

/**
 * Componente de página de reproductor de video.
 * Recibe un video a través del state de navegación y lo muestra en pantalla completa.
 * 
 * @returns {JSX.Element} Vista de reproductor de video con controles y navegación.
 */
export default function VideoPlayer() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const hideControlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Obtener el video desde el state de navegación
    const videoFromState = location.state?.video as Video | undefined;
    
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
          className={`absolute top-4 left-4 z-50 p-3 hover:bg-gray-800/60 rounded-full hover:backdrop-blur-md transition-all duration-300 pointer-events-auto ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          aria-label="Volver"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Button>

        {/* Título de la vista - con transición suave */}
        <div 
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <h1 className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Vista Pantalla Completa
          </h1>
        </div>

        {/* Información del video - con transición suave */}
        <div 
          className={`absolute bottom-20 left-4 right-4 z-40 flex justify-between items-end transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
            <p className="text-white text-sm">
              Duración: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')} min
            </p>
            {video.user && (
              <p className="text-white/70 text-xs mt-1">
                Por: {video.user.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

