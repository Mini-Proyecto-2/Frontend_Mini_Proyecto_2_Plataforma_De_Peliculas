import { extractTitleFromUrl } from '@/lib/extractTitleFromUrl';
import React from 'react';

interface MovieCardProps {
  imageUrl: string;
  url: string;
  user: {
    name: string;
    url: string;
  }
}

const MovieCard: React.FC<MovieCardProps> = ({ imageUrl, url, user }) => {
  const title = extractTitleFromUrl(url)

  return (
    <div className="h-[250px] sm:h-[280px] lg:h-[350px] aspect-[12/16] bg-white rounded-3xl overflow-hidden">
      {/* Imagen */}
      <div className="relative h-3/5 bg-gray-200 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
          draggable={false}
        />
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