import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { PexelsVideo } from "../types/pexels";
import { getPexelsById } from "../service/pexels";
import { extractTitleFromUrl } from "../lib/extractTitleFromUrl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Play } from "lucide-react";
import { MovieReactionButtons } from "@/components/movieDetails/MovieReactionButtons";
import { Button } from "@/components/ui/button";
import RatingStarts from "@/components/movieDetails/RatingStarts";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<PexelsVideo | null>(null);
  const [error, setError] = useState(false)

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
        setError(true);
        console.error("Error cargando la película:", error);
      }
    };

    loadMovie();
  }, [id]);

  const handleClickButton = () => {
    navigate(`/watch/${movie?.id}`);
  };

  const title = extractTitleFromUrl(movie?.url || "");

  if (error) {
    return (
      <div className="flex justify-center items-center p-6">
        <Alert variant="destructive" className="bg-white lg:w-1/2 w-full lg:max-w-[600px] max-w-full">
          <AlertCircleIcon />
          <AlertTitle>Error cargando la película</AlertTitle>
          <AlertDescription>
            <p>Por favor, verifica la información de la película y vuelve a intentarlo.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Verifica la información de la película</li>
              <li>Verifica que la película exista</li>
              <li>Verifica que la película no haya sido eliminada</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!movie) {
    return (
      <div
        className="flex justify-between items-end bg-gradient-to-t from-primary via-transparent h-[60dvh] max-h-[1200px] p-6"
        style={{
          background: "linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)",
          animation: "shimmer 3s ease-in-out infinite",
        }} />
    )
  }

  return (
    <div>
      <div
        className="flex justify-between items-end bg-gradient-to-t from-primary via-transparent h-[60dvh] max-h-[1200px] p-6"
        style={{

          background: `linear-gradient(transparent 0%, #242f3b67 75%, #242f3b 100%), url(${movie.image})`, backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <section>
          <p className="font-bold text-[2.2rem]">{title}</p>
          <p className="text-gray-300 text-md">
            {movie?.user.name}
          </p>
        </section>
        <section className="flex gap-4">
          <Button
            className="bg-primary hover:bg-primary/80 h-10"
            onClick={handleClickButton}>
            <Play className="h-4 w-4" />Ver Película
          </Button>
          <MovieReactionButtons
            movie={{
              title: title,
              pexelsUser: movie.user.name,
              pexelsId: movie.id.toString(),
              miniatureUrl: movie.image
            }}
          />
        </section>
      </div>

      <div className="p-6">
        <RatingStarts id={movie.id} rating={14} />
      </div>
    </div>
  );
}
