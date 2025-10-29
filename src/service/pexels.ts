import { useApi } from "../hooks/useApi";

const { request } = useApi();

export const getPexelsList = async () => {
    return request("pexels/search?query=pets&per_page=20", "GET");
};