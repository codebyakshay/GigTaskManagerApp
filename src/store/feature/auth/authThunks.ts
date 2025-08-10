import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../libs/firebase";
import { toAuthUser } from "../../../models/auth";

// login
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(cred.user);
  }
);

// signup (+ ensure /users/{uid} doc exists)
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, `users/${cred.user.uid}`), {}, { merge: true });
    return toAuthUser(cred.user);
  }
);

// logout
export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

// start auth listener once at app bootstrap
export const startAuthListener = () => (dispatch: any, getState: any) => {
  // setUser is defined in authSlice; import lazily to avoid circular import at module top
  const { setUser } = require("./authSlice");
  return onAuthStateChanged(auth, (u) =>
    dispatch(setUser(u ? toAuthUser(u) : null))
  );
};
