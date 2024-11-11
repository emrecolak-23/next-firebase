"use client";
import { AuthWrapper } from "../components/auth-wrapper";
import { useSession } from "../hooks/use-session";

export const DashboardPage: React.FC = () => {
  const session = useSession();

  return (
    <AuthWrapper>
      <span>{JSON.stringify(session.user, null, 2)}</span>

      <button type="button" onClick={() => session.signOut()}>
        Logout
      </button>
    </AuthWrapper>
  );
};

export default DashboardPage;
