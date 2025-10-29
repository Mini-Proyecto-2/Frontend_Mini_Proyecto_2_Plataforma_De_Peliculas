import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export default function Favorites() {
  const { request } = useApi();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await request("movies", "GET");
        setFavorites(data || []);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };
    loadFavorites();
  }, []);

  if (!favorites.length) {
    return <p>No tienes películas favoritas aún.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {favorites.map((movie: any) => (
        <div key={movie._id} className="border p-3 rounded-lg">
          <img src={movie.miniatureUrl} alt={movie.title} className="rounded" />
          <h3 className="font-bold mt-2">{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
