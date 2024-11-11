import { apiClient } from "../configs/api-client";

export const login = async (accessToken: string) => {
  return await apiClient("/auth/login", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};
