/**
 * @file VideoPlayer.tsx
 * @description Página de reproductor de video en pantalla completa.
 * Muestra un video individual en pantalla completa con controles.
 * 
 * @component
 * @returns {JSX.Element} Reproductor de video en pantalla completa.
 */

"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

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
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Obtener el video desde el state de navegación
    const videoFromState = location.state?.video as Video | undefined
    
    if (videoFromState) {
      setVideo(videoFromState)
      setLoading(false)
    } else {
      toast.error("No se proporcionó ningún video")
      setLoading(false)
    }
  }, [location.state])

  /**
   * Navega de regreso a la página anterior.
   */
  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Spinner className="size-[3rem] text-white" />
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <p className="text-xl mb-4">No hay video disponible</p>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Botón de regreso */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Volver"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Título de la vista */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
        <h1 className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
          Vista Pantalla Completa
        </h1>
      </div>

      {/* Reproductor de video */}
      <div className="flex items-center justify-center h-full w-full">
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

      {/* Información del video */}
      <div className="absolute bottom-4 left-4 right-4 z-40 flex justify-between items-end">
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
  )
}

