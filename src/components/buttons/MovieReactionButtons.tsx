import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MovieReactionButtonsProps {
  movieId: string | number;
  initialLiked?: boolean;
  onReactionService: (movieId: string | number, liked: boolean) => Promise<void>;
  onError?: (error: unknown) => void;
}

export function MovieReactionButtons({ 
  movieId, 
  initialLiked = false,
  onReactionService,
  onError 
}: MovieReactionButtonsProps) {
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const newValue = !isLiked;
      await onReactionService(movieId, newValue);
      setIsLiked(newValue);
    } catch (error) {
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "transition-all hover:bg-transparent",
        isLiked && "text-red-500 hover:text-red-600"
      )}
    >
      <Heart 
        className={cn(
          "h-6 w-6",
          isLiked && "fill-current",
          isLoading && "animate-pulse"
        )} 
      />
    </Button>
  );
}