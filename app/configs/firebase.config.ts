import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      });

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export function signInWithGoogle(): ReturnType<typeof signInWithPopup> {
  return signInWithPopup(auth, googleAuthProvider);
}
