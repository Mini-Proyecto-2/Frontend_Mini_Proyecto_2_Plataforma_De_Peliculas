
import { useApi } from "../hooks/useApi";

const { request } = useApi();

export const getProfile = async () => {
  return request("auth/profile", "GET");
};

export const updateProfile = async (body: any) => {
  return request("auth/profile", "PUT", body);
};

export const deleteProfile = async (body: any) => {
  return request("auth/profile", "DELETE", body);
};