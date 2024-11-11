/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

import { handleError } from "../utils/error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.meta === "undefined") {
        return handleError(error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _a, _b, mutation: any) => {
      if (typeof mutation.meta === "undefined") {
        return handleError(error);
      }
    },
  }),
});

export function QueryClientConfiguredProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
