import React from 'react';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';
import { MovieReactionButtons } from '../movieDetails/MovieReactionButton';

interface FavoriteMovieCardProps {
  pexelsId: string;
  miniatureUrl: string;
  title: string;
  pexelUser: string;
  reload: () => void;
}

const FavoriteMovieCard: React.FC<FavoriteMovieCardProps> = ({ pexelsId, miniatureUrl, title, pexelUser, reload }) => {
  const handleClickButton = () => {
    window.open(`/pelicula/${pexelsId}`)  
  }

  return (
    <div className="h-[250px] sm:h-[280px] lg:h-[350px] aspect-[12/16] bg-white rounded-3xl overflow-hidden">
      {/* Imagen */}
      <div
        className="relative h-3/5"
        style={{
          backgroundImage: `url(${miniatureUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <Button 
          className="absolute bottom-4 left-4 bg-primary/50 hover:bg-primary/70"
          onClick={handleClickButton}>
          <Play className="h-4 w-4" />Ver Película
        </Button>
        <section className="absolute top-4 right-4">
          <MovieReactionButtons movie={{ pexelsId, miniatureUrl, title, pexelUser }} reload={() => reload()} />
        </section>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <p className="text-gray-600 text-xs lg:text-sm">
          {pexelUser}
        </p>
        <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900">
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </h3>
      </div>
    </div>
  );
}

export default FavoriteMovieCard;