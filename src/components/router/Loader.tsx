/**
 * @file Full Screen Loader Component
 * @description Displays a centered full-screen loading spinner with the Film Unity logo.
 * Used during initial app loading, authentication checks, or other async operations
 * that require blocking the entire UI.
 */

import { Spinner } from "../ui/spinner";
import logo from "@/assets/logo-white.png";

/**
 * Full Screen Loader Component
 * 
 * Renders a full-screen overlay with centered logo and animated spinner.
 * Provides visual feedback during app initialization, route transitions,
 * or other long-running operations that require user to wait.
 * 
 * Visual Hierarchy:
 * - Film Unity logo (white version)
 * - Animated spinner below logo
 * - Centered vertically and horizontally
 * - Takes up entire viewport
 * 
 * @component
 * 
 * @example
 * ```tsx
 * In App.tsx during authentication check
 * function App() {
 *   const { loading } = useAuth();
 *   
 *   if (loading) {
 *     return <FullScreenLoader />;
 *   }
 *   
 *   return <Router>...</Router>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * In a route component during data fetching
 * function MoviePage() {
 *   const { movie, loading } = useMovie(id);
 *   
 *   if (loading) {
 *     return <FullScreenLoader />;
 *   }
 *   
 *   return <MovieDetails movie={movie} />;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * In AuthContext during session validation
 * export function AuthProvider({ children }: { children: ReactNode }) {
 *   const [loading, setLoading] = useState(true);
 *   
 *   useEffect(() => {
 *     checkSession().finally(() => setLoading(false));
 *   }, []);
 *   
 *   if (loading) {
 *     return <FullScreenLoader />;
 *   }
 *   
 *   return <AuthContext.Provider>...</AuthContext.Provider>;
 * }
 * ```
 * 
 * @returns {JSX.Element} Full screen loading overlay with logo and spinner
 * 
 * @remarks
 * - Uses white logo version (logo-white.png) for better visibility
 * - Spinner is 5rem (80px) in size
 * - Background color should be set via global styles or parent component
 * - Component is self-contained and requires no props
 * - Flexbox ensures perfect centering regardless of viewport size
 * 
 * @see {@link Spinner} - Animated loading spinner component
 */
const FullScreenLoader = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center">
      <img
        src={logo}
        alt="Logo FilmUnity"
        className="h-20 object-contain"
      />
      <Spinner className="size-[5rem] text-white" />
    </div>
  )
}


export { FullScreenLoader };