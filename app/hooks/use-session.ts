/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AuthStore, useAuthStore } from "./use-auth-store";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { me as apiMe } from "../services/me";
import { logout as apiLogout } from "../services/logout";
import { login as apiLogin } from "../services/login";

type UseSessionReturn = {
  user: AuthStore["user"];
  status: AuthStore["status"];
  refresh: () => void;
  signOut: () => Promise<void>;
  loginMutation: any;
};

export function useSession(): UseSessionReturn {
  const authStore = useAuthStore();
  const navigate = useRouter();

  const signOutMutation = useMutation({
    mutationFn: apiLogout,
    onSuccess() {
      authStore.clear();
      navigate.push("/");
    },
  });

  const meQuery = useQuery({
    enabled: authStore.user === null,
    refetchOnWindowFocus: false,
    queryFn: apiMe,
    queryKey: ["me"],
  });

  const loginMutation = useMutation({
    mutationFn: (accessToken: string) => apiLogin(accessToken),
    onSuccess(data) {
      console.log(data, "data");
      authStore.set({
        user: data as any,
        status: "authenticated",
      });

      navigate.push("/dashboard");
    },
    onError() {
      console.log("emre colak");
      authStore.set({
        user: null,
        status: "unauthenticated",
      });
    },
  });

  return {
    user: authStore.user,
    status: authStore.status,
    refresh: () => meQuery.refetch(),
    async signOut() {
      await signOutMutation.mutateAsync();
    },
    loginMutation,
  };
}
