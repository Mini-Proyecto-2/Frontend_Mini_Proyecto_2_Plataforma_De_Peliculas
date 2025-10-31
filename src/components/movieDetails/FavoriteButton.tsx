import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFavoriteById, removeFavorite, addFavorite } from '@/service/movies';
import { toast } from 'sonner';
import type { Movie } from '@/types/movie';

interface FavoriteButtonProps {
  movie: Movie
  reload?: () => void
}

export function FavoriteButton({ 
  movie, 
  reload
}: FavoriteButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(Boolean(reload));
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await removeFavorite(movie.pexelsId);
      } else {
        await addFavorite(movie);
      }
      if (reload) {
        reload();
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
        setIsLiked(!!data.exists);
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
        Boolean(reload) ? "w-8 h-8 bg-primary/50 hover:bg-primary/70" : ""
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