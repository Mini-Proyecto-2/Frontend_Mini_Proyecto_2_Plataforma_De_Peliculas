import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { Heart, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get, del } = useApi();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await get('/favorites');
      setFavorites(data);
    } catch (error) {
      console.error('Error cargando favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await del(`/favorites/${id}`);
      setFavorites(favorites.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error eliminando favorito:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white/60">
        <Heart size={64} className="mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No tienes favoritos</h2>
        <p>Empieza a agregar contenido a tu lista de favoritos</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Mis Favoritos</h1>
        <p className="text-white/60">{favorites.length} contenidos guardados</p>
      </div>

      {/* Grid de contenidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div 
            key={item.id} 
            className="group relative bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-white/20 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay con botón de reproducir (aparece al hacer hover) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="icon" className="rounded-full w-16 h-16">
                  <Play className="h-8 w-8" fill="currentColor" />
                </Button>
              </div>

              {/* Botón eliminar (siempre visible en la esquina) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(item.id);
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors z-10"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Info del contenido */}
            <div className="p-4">
              <h3 className="font-semibold text-white truncate mb-1">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>{item.duration}</span>
                <span>{item.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}