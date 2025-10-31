import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import type { Movie } from "@/types/movie";
import FavoriteMovieCard from "@/components/movie/FavoriteMovieCard";
import { Spinner } from "@/components/ui/spinner";

export default function Favorites() {
  const { request } = useApi();
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const data = await request("movies", "GET") as Movie[];
        setFavorites(data);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [reload]);

  return (
    <div className="container w-full p-8">
      <h1 className="font-bold">Favoritos</h1>
      {loading ? (
        <Spinner className="size-[3rem] text-white my-8 mx-auto" />
      ) : favorites.length === 0 ? (
        <p className="text-white">No hay favoritos</p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-6 xs:justify-center justify-start">
          {favorites.map((movie) => (
            <FavoriteMovieCard key={movie.pexelsId} {...movie} reload={() => setReload(!reload)} />
          ))}
        </div>
      )}
    </div>
  );
}
