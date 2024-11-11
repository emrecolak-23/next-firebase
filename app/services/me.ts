import { apiClient } from "../configs/api-client";

export async function me() {
  return apiClient.get("/auth/me");
}
