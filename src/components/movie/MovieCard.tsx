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
    <div className="w-[300px] md:w-[250px] h-[380px] bg-white rounded-2xl overflow-hidden">
      {/* Imagen */}
      <div className="relative h-[210px] bg-gray-200 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 ellipsis">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {user.name}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;