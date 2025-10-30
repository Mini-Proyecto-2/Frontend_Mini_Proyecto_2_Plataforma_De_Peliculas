/**
 * @file Dashboard.tsx
 * @description Displays key movie-related statistics and metrics in a responsive card grid layout.
 * This component serves as the main user dashboard showing movie activity insights.
 *
 * @example
 * ```tsx
 * import Dashboard from "@/app/dashboard/page"
 *
 * export default function App() {
 *   return <Dashboard />
 * }
 * ```
 */

"use client"

import { useEffect, useState } from "react"
import { getPexelsList } from "../service/pexels"
import { Spinner } from "@/components/ui/spinner"
import MovieCard from "@/components/movie/MovieCard"
import { toast } from "sonner"
import MovieRow from "@/components/movie/MovieRow"


type PexelsVideo = {
  avg_color: null | string;
  duration: number;
  full_res: null | string;
  height: number;
  id: number;
  image: string;
  tags: string[];
  url: string;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: {}[];
  video_pictures: {}[];
  width: number;
}


/**
 * Renders the main dashboard page.
 * Displays static metrics for demonstration purposes such as:
 * - Movies watched
 * - Watch time
 * - Ratings
 * - Most/least watched and rated movies
 *
 * @component
 * @returns {JSX.Element} A responsive grid layout with movie statistics.
 */
export default function Dashboard() {
  const [pexelsList, setPexelsList] = useState<PexelsVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPexelsList = async () => {
      try {
        setLoading(true)
        const response = await getPexelsList()
        setPexelsList(response.videos)
      } catch (error) {
        toast.error("Error al cargar la lista de videos")
      } finally {
        setLoading(false)
      }
    }

    fetchPexelsList()
  }, [])

  return (
    <div className="space-y-6 pb-8">
      <h1 className="font-bold">Dashboard</h1>

      {loading ? (
        <Spinner className="size-[3rem] text-white" />
      ) : (
        <>
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Videos</h3>
          <MovieRow
          >
            {pexelsList.map((pexels: PexelsVideo, index: number) => (
              <div key={index} className="flex-shrink-0">
                <MovieCard
                  imageUrl={pexels.image}
                  url={pexels.url}
                  user={pexels.user}
                />
              </div>
            ))}
          </MovieRow>
        </section>
        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Favoritos</h3>
          <MovieRow
          >
            {pexelsList.map((pexels: PexelsVideo, index: number) => (
              <div key={index} className="flex-shrink-0">
                <MovieCard
                  imageUrl={pexels.image}
                  url={pexels.url}
                  user={pexels.user}
                />
              </div>
            ))}
          </MovieRow>
        </section>
        </>
      )}
    </div>
  )
}