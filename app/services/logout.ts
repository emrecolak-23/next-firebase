import { apiClient } from "../configs/api-client";

export async function logout() {
  return await apiClient.post("/auth/logout");
}
