import { useApi } from "../hooks/useApi";

const { request } = useApi()

export const createComment = async (description: string, moviePexelsId: number) => {
    return request(`comments`, "POST", { description, moviePexelsId });
};

export const getCommentsByMovie = async (movieId: number) => {
    return request(`comments/movie/${movieId}`, "GET");
};

export const editComment = async (commentId: string, description: string) => {
    return request(`comments/${commentId}`, "PUT", { description });
};

export const deleteComment = async (commentId: string) => {
    return request(`comments/${commentId}`, "DELETE");
};

