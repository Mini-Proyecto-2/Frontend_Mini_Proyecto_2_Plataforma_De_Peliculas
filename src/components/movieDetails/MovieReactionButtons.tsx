import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFavoriteById, removeFavorite, addFavorite } from '@/service/movies';
import { toast } from 'sonner';
import type { Movie } from '@/types/movie';

interface MovieReactionButtonsProps {
  movie: Movie
}

export function MovieReactionButtons({ 
  movie, 
}: MovieReactionButtonsProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await removeFavorite(movie.pexelsId);
      } else {
        await addFavorite(movie);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error(isLiked ? "Error al quitar la película de favoritos" : "Error al agregar la película a favoritos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getFavoriteById(movie.pexelsId);
        setIsLiked(!!data);
      } catch (error) {
        toast.error("Error cargando la película");
      }
    };
    loadMovie();
  }, [movie.pexelsId]);

  return (
    <Button
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "w-10 h-10 transition-all hover:bg-primary/80 shadow-lg",
      )}
    >
      <Heart 
        className={cn(
          "h-6 w-6 text-white",
          isLiked && "text-[#E63946] fill-current",
          loading && "animate-pulse"
        )} 
      />
    </Button>
  );
}