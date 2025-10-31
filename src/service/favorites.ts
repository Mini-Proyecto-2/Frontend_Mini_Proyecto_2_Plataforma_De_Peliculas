const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const favoritesService = {
  getFavorites: async (apiGet: Function) => {
    return await apiGet(`${API_URL}/favorites`);
  },
  
  addFavorite: async (apiPost: Function, movieId: string) => {
    return await apiPost(`${API_URL}/favorites`, { movieId });
  },
  
  removeFavorite: async (apiDel: Function, movieId: string) => {
    return await apiDel(`${API_URL}/favorites/${movieId}`);
  }
};