import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { PexelsVideo } from "../types/pexels";
import { getPexelsById } from "../service/pexels";
import { extractTitleFromUrl } from "../lib/movie";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStarts from "@/components/movieDetails/RatingStarts";
import { FavoriteButton } from "@/components/movieDetails/FavoriteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { CommentSection } from "@/components/movieDetails/CommentSection";

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
    navigate("/video-player", { state: { video: movie } })
  };

  const title = extractTitleFromUrl(movie?.url || "");

  if (error) {
    return (
      <div className="flex justify-center items-center p-6">
        <Alert variant="destructive" className="bg-white lg:w-1/2 w-full lg:max-w-[600px] max-w-full">
          <AlertCircleIcon />
          <AlertTitle>Error cargando la película</AlertTitle>
          <AlertDescription>
            <p>Por favor, verificar la información de la película y vuelve a intentarlo.</p>
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
      <>
        <Skeleton className="h-[60dvh] max-h-[1200px] rounded-none" />
        <div className="p-12">
          <Spinner className="size-16 mx-auto" />
        </div>
      </>
    )
  }

  return (
    <div>
      <div
        className="sticky-none lg:sticky -top-[calc(60dvh-100px)] flex flex-col lg:flex-row justify-between items-end gap-16 bg-gradient-to-t from-primary via-transparent h-[60dvh] max-h-[1200px] p-8"
        style={{

          background: `linear-gradient(transparent 0%, #242f3b67 75%, #242f3b 100%), url(${movie.image})`, backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <section className="flex flex-col lg:self-end self-start">
          <p className="font-bold text-2xl">{window.innerWidth >= 1240 ? title : window.innerWidth < 1024 ? title : title.slice(0, 30) + "..."}</p>
          <p className="text-gray-300 text-md">
            {movie?.user.name}
          </p>
        </section>
        <section className="flex gap-4">
          <Button
            className="bg-primary hover:bg-primary/80 h-10"
            onClick={handleClickButton}>
            <Play className="h-4 w-4" />Reproducir
          </Button>
          <FavoriteButton
            movie={{
              title: title,
              pexelUser: movie.user.name,
              pexelsId: movie.id.toString(),
              miniatureUrl: movie.image
            }}
          />
        </section>
      </div>

      <div className="p-8 space-y-4">
        <RatingStarts id={movie.id} />
        <CommentSection id={movie.id} />
      </div>
    </div>
  );
}
