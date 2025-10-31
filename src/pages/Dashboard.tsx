"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Play } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()

  // Video de ejemplo para probar el reproductor (video real de Pexels)
  const exampleVideo = {
    id: 3571264,
    width: 3840,
    height: 2160,
    url: "https://www.pexels.com/video/drone-view-of-big-waves-rushing-to-the-shore-3571264/",
    duration: 33,
    image: "https://images.pexels.com/videos/3571264/free-video-3571264.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    video_files: [
      {
        id: 9326816,
        quality: "hd",
        file_type: "video/mp4",
        width: 1920,
        height: 1080,
        link: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4"
      },
      {
        id: 9326703,
        quality: "hd",
        file_type: "video/mp4",
        width: 1280,
        height: 720,
        link: "https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4"
      },
      {
        id: 9326361,
        quality: "sd",
        file_type: "video/mp4",
        width: 640,
        height: 360,
        link: "https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4"
      }
    ],
    video_pictures: [
      {
        id: 815098,
        nr: 0,
        picture: "https://images.pexels.com/videos/3571264/pictures/preview-0.jpg"
      },
      {
        id: 815099,
        nr: 1,
        picture: "https://images.pexels.com/videos/3571264/pictures/preview-1.jpg"
      }
    ],
    user: {
      id: 1498112,
      name: "Enrique",
      url: "https://www.pexels.com/@enrique"
    }
  }

  const handleOpenVideoPlayer = () => {
    navigate("/video-player", { state: { video: exampleVideo } })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleOpenVideoPlayer} className="gap-2">
          <Play className="w-4 h-4" />
          Probar Reproductor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Películas vistas</p>
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm text-muted-foreground">en los últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Tiempo de películas vistas</p>
            <p className="text-2xl font-bold">5 horas</p>
            <p className="text-sm text-muted-foreground">en los últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Métricas de rating</p>
            <p className="text-2xl font-bold">4.5</p>
            <p className="text-sm text-muted-foreground">en los últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Películas más vistas</p>
            <p className="text-2xl font-bold">The Shawshank Redemption</p>
            <p className="text-sm text-muted-foreground">100 veces</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Películas menos vistas</p>
            <p className="text-2xl font-bold">The Godfather</p>
            <p className="text-sm text-muted-foreground">10 veces</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Películas más valoradas</p>
            <p className="text-2xl font-bold">The Godfather</p>
            <p className="text-sm text-muted-foreground">4.8/5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
