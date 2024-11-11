"use client";
import { signInWithGoogle } from "./configs/firebase.config";
import { useSession } from "./hooks/use-session";

export default function Home() {
  const { loginMutation } = useSession();

  async function signIn() {
    try {
      const userCredentials = await signInWithGoogle();
      const accessToken = await userCredentials.user.getIdToken();
      console.log(accessToken);

      await loginMutation.mutateAsync(accessToken);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          void signIn();
        }}
      >
        Sign In
      </button>
    </div>
  );
}
