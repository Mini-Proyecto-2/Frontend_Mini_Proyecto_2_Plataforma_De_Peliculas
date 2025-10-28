import { useApi } from "../hooks/useApi";

const { request } = useApi();

export const getPexelsList = async () => {
    return request("pexels/search/Pets", "GET");
};