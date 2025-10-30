import { useApi } from "../hooks/useApi";

const { request } = useApi();

export const getPexelsList = async (query: string) => {
    return request(`pexels/search?query=${query || "pets"}&per_page=20`, "GET");
};

export const getPexelsById = async (id: string) => {
    return request(`pexels/searchById/${id}`, "GET");
};