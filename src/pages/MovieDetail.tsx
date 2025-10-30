import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Heart } from "lucide-react";

export default function MovieDetail() {
  const { id } = useParams();
  const { request } = useApi();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      const data = await request(`/movies/${id}`, "GET");
      setMovie(data);
      // podrías validar si ya es favorito según tus datos o token
    } catch (error) {
      console.error("Error cargando la película:", error);
      navigate("/favoritos");
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await request(`/movies/${movie._id}`, "DELETE");
        setIsFavorite(false);
      } else {
        await request("/movies", "POST", {
          title: movie.title,
          videoUrl: movie.videoUrl,
          miniatureUrl: movie.miniatureUrl,
          pexelsId: movie.pexelsId || "",
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error modificando favorito:", error);
    }
  };

  if (!movie) return <div className="text-white">Cargando...</div>;

  return (
    <div className="p-6 text-white">
      <img
        src={movie.miniatureUrl}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <button
          onClick={toggleFavorite}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          <Heart
            className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
            size={28}
          />
        </button>
      </div>

      {movie.videoUrl && (
        <video
          controls
          src={movie.videoUrl}
          className="w-full rounded-lg shadow-lg"
        />
      )}

      <p className="mt-4 text-gray-300">
        {movie.description || "Sin descripción disponible."}
      </p>
    </div>
  );
}
