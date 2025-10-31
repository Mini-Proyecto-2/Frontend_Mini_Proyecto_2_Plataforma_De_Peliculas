import { useApi } from "../hooks/useApi";

const { request } = useApi()

export const createComment = async (description: string, moviePexelsId: number) => {
    return request(`comments`, "POST", { description, moviePexelsId });
};

export const getCommentsByMovie = async (movieId: number) => {
    return request(`comments/movie/${movieId}`, "GET");
};
