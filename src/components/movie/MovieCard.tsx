import { extractTitleFromUrl } from '@/lib/movie';
import React from 'react';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';

interface MovieCardProps {
  id: number;
  imageUrl: string;
  url: string;
  user: {
    name: string;
  }
}

const MovieCard: React.FC<MovieCardProps> = ({ id, imageUrl, url, user }) => {
  const title = extractTitleFromUrl(url)

  const handleClickButton = () => {
    window.open(`/pelicula/${id}`)  
  }

  return (
    <div className="h-[250px] sm:h-[280px] lg:h-[350px] aspect-[12/16] bg-white rounded-3xl overflow-hidden">
      {/* Imagen */}
      <div
        className="relative h-3/5"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <Button 
          className="absolute bottom-4 left-4 bg-primary/50 hover:bg-primary/70"
          onClick={handleClickButton}>
          <Play className="h-4 w-4" />Ver Película
        </Button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <p className="text-gray-600 text-xs lg:text-sm">
          {user.name}
        </p>
        <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900">
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </h3>
      </div>
    </div>
  );
}

export default MovieCard;