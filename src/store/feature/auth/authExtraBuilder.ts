// src/store/feature/auth/authExtraBuilder.ts
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { signIn, signUp, logOut } from "./authThunks";
import type { AuthState } from "./authSlice"; // <- type-only import

export function addAuthExtraReducers(
  builder: ActionReducerMapBuilder<AuthState>
) {
  builder
    .addCase(signIn.pending, (s) => {
      s.error = undefined;
    })
    .addCase(signIn.rejected, (s, a) => {
      s.error = String(a.error.message);
    })
    .addCase(signUp.pending, (s) => {
      s.error = undefined;
    })
    .addCase(signUp.rejected, (s, a) => {
      s.error = String(a.error.message);
    })
    .addCase(logOut.fulfilled, (s) => {
      s.user = null;
    });
}
