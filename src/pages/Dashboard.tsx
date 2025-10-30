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
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold">Dashboard</h1>
        <>
          <section key="movies" className="space-y-4">
            <h3 className="text-2xl font-bold">Películas</h3>
            <MovieRow category="movies" />
          </section>
          <section key="pets" className="space-y-4">
            <h3 className="text-2xl font-bold">Mascotas</h3>
            <MovieRow category="pets" />
          </section>
          <section key="sports" className="space-y-4">
            <h3 className="text-2xl font-bold">Deportes</h3>
            <MovieRow category="sports" />
          </section>
        </>
    </div>
  )
}