import { useApi } from "../hooks/useApi";
import type { Movie } from "../types/movie";

const { request } = useApi()

export const getFavorites = async () => {
  return request("movies", "GET");
};

export const getFavoriteById = async (movieId: string) => {
  return request(`movies/${movieId}`, "GET");
};

export const addFavorite = async (movie: Movie) => {
  return request("movies", "POST", movie);
};

export const removeFavorite = async (movieId: string) => {
  return request(`movies/${movieId}`, "DELETE");
};
