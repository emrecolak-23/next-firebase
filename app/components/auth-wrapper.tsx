import React from "react";
import { useSession } from "../hooks/use-session";

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const session = useSession();

  if (session.status === "loading" || session.status === "unauthenticated") {
    return <p>Loading...</p>;
  }

  return children;
};
