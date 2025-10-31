import { useApi } from "../hooks/useApi";

const { request } = useApi()

export const getMovieRating = async (movieId: number) => {
  return request(`ratings/movie/${movieId}`, "GET");
};

export const postMovieRating = async (movieId: number, value: number) => {
  return request(`ratings`, "POST", { value, moviePexelsId: movieId });
};