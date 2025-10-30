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

import { useEffect, useState, type JSX } from "react"
import { getPexelsList } from "../service/pexels"
import { Spinner } from "@/components/ui/spinner"
import MovieCard from "@/components/movie/MovieCard"
import { toast } from "sonner"
import MovieRow from "@/components/movie/MovieRow"
import type { PexelsVideo } from "@/types/pexels"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

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
export default function Dashboard(): JSX.Element {
  const [petsList, setPetsList] = useState<PexelsVideo[]>([])
  const [moviesList, setMoviesList] = useState<PexelsVideo[]>([])
  const [sportsList, setSportsList] = useState<PexelsVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchPexelsList = async () => {
      try {
        setLoading(true)
        const [pets, movies, sports] = await Promise.all([
          getPexelsList("pets"),
          getPexelsList("movies"),
          getPexelsList("sports"),
        ])
        setPetsList(pets.videos)
        setMoviesList(movies.videos)
        setSportsList(sports.videos)
      } catch (error) {
        setError(true)
        toast.error("Error al cargar la lista de videos")
      } finally {
        setLoading(false)
      }
    }

    fetchPexelsList()
  }, [])

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold">Dashboard</h1>

      {loading ? (
        <Spinner className="size-[3rem] text-white" />
      ) : error ? (
        <>
          <Alert variant="destructive" className="w-1/2 bg-red-200">
            <AlertCircleIcon />
            <AlertTitle>Error al cargar la lista de videos</AlertTitle>
            <AlertDescription>
              <p>Por favor, intenta de nuevo.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Verifica tu conexión a internet</li>
                <li>Intenta de nuevo</li>
                <li>Si el problema persiste, contacta al soporte</li>
              </ul>
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          <section key="movies" className="space-y-4">
            <h3 className="text-2xl font-bold">Películas</h3>
            <MovieRow
            >
              {moviesList.map((pexels: PexelsVideo, index: number) => (
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
          <section key="pets" className="space-y-4">
            <h3 className="text-2xl font-bold">Mascotas</h3>
            <MovieRow
            >
              {petsList.map((pexels: PexelsVideo, index: number) => (
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
          <section key="sports" className="space-y-4">
            <h3 className="text-2xl font-bold">Deportes</h3>
            <MovieRow
            >
              {sportsList.map((pexels: PexelsVideo, index: number) => (
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