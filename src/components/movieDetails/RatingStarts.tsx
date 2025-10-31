import { useEffect, useState } from 'react';
import { StarIcon } from 'lucide-react';
import { getMovieRating, postMovieRating } from '@/service/rating';
import { toast } from 'sonner';
import type { MovieRating } from '@/types/rating';
import { Spinner } from '../ui/spinner';

type RatingStarsProps = {
  id: number;
};

const RatingStars: React.FC<RatingStarsProps> = ({ id }) => {
  const [rating, setRating] = useState<MovieRating>({
    averageRating: 0,
    totalRatings: 0,
    userRating: 0
  });
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const data = await getMovieRating(id);
        setRating(data);
      } catch (error) {
        toast.error("Error cargando la película");
      } finally {
        setLoading(false);
      }
    };

    loadRatings();
  }, [id, reload]);

  const renderStars = () => {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const handleStarClick = async (starValue: number) => {
      try {
        setLoading(true);
        await postMovieRating(id, starValue);
        setReload(!reload);
        toast.success("Pelicula calificada exitosamente");
      } catch (error) {
        toast.error("Error calificando la película");
      } finally {
        setLoading(false);
      }
    };

    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starValue = i + 1;
      const isActive = hoveredStar !== null ? starValue <= hoveredStar : rating.userRating >= starValue;
      const isHovered = hoveredStar === starValue;

      stars.push(
        <StarIcon
          key={i}
          className={`text-[#FFD60A] cursor-pointer transition-all duration-200 ease-in-out ${isActive ? 'fill-current' : ''
            } ${isHovered ? 'scale-125' : 'scale-100'
            } ${loading ? 'opacity-50 pointer-events-none' : ''
            }`}
          onMouseEnter={loading ? undefined : () => setHoveredStar(starValue)}
          onMouseLeave={loading ? undefined : () => setHoveredStar(null)}
          onClick={loading ? undefined : () => handleStarClick(starValue)}
        />
      );
    }

    return (
      <div className="flex gap-1 items-center">
        {stars}
        {loading && <Spinner className="size-6" />}
      </div>
    );
  };

  return (
    <section className="flex gap-2 items-center">
      <div className="flex gap-1">{renderStars()}</div>
      <section className=''>
        <p className='text-xs'>{rating.averageRating.toFixed(1)}/5</p>
        <p className="text-xs">{rating.totalRatings} {rating.totalRatings === 1 ? 'voto' : 'votos'}</p>
      </section>
    </section>
  );
};

export default RatingStars;
