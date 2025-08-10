// tempSignIn.ts
import { useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../libs/firebase";

export function useTempSignIn() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        try {
          await signInWithEmailAndPassword(
            auth,
            "aksinha8989@gmail.com",
            "Hellohowru123@@@"
          );
          console.log("Signed in ok");
        } catch (e) {
          console.log("Sign-in error:", e);
        }
      } else {
        console.log("Already signed in as", u.uid);
      }
    });
    return unsub;
  }, []);
}
