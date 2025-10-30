import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { PexelsVideo } from "../types/pexels";
import { getPexelsById } from "../service/pexels";
import { extractTitleFromUrl } from "../lib/extractTitleFromUrl";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<PexelsVideo | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/favoritos");
      return;
    }

    const loadMovie = async () => {
      try {
        const data = await getPexelsById(id);
        setMovie(data);
      } catch (error) {
        console.error("Error cargando la película:", error);
        navigate("/favoritos");
      }
    };
    
    loadMovie();
  }, [id, navigate]);

  // const toggleFavorite = async () => {
  //   try {
  //     if (isFavorite) {
  //       await request(`/movies/${movie.id}`, "DELETE");
  //       setIsFavorite(false);
  //     } else {
  //       await request("/movies", "POST", {
  //         title: movie.title,
  //         videoUrl: movie.videoUrl,
  //         miniatureUrl: movie.miniatureUrl,
  //         pexelsId: movie.pexelsId || "",
  //       });
  //       setIsFavorite(true);
  //     }
  //   } catch (error) {
  //     console.error("Error modificando favorito:", error);
  //   }
  // };

  if (!movie) return <div className="text-white">Cargando...</div>;

  const title = extractTitleFromUrl(movie.url);

  return (
    <div className="text-white">
      <img
        src={movie.image}
        alt={title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      {movie.video_files[0] && (
        <video
          controls
          src={movie.video_files[0].link}
          className="w-full rounded-lg shadow-lg"
        />
      )}

      <p className="mt-4 text-gray-300">
        {title || "Sin descripción disponible."}
      </p>
    </div>
  );
}
