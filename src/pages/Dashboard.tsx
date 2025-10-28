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

import { Card, CardContent } from "@/components/ui/card"

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
