//src/models/auth.ts
// src/models/auth.ts

import type { User } from "firebase/auth";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
};

export const toAuthUser = (u: User): AuthUser => ({
  uid: u.uid,
  email: u.email ?? null,
  displayName: u.displayName ?? null,
  photoURL: u.photoURL ?? null,
  emailVerified: u.emailVerified,
});
