import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../../models/auth";
import { addAuthExtraReducers } from "./authExtraBuilder";

export type AuthState = {
  user: AuthUser | null;
  ready: boolean;
  error?: string;
};
const initialState: AuthState = { user: null, ready: false };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.ready = true;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (b) => addAuthExtraReducers(b),
});

export const { setUser, setError } = slice.actions;
export default slice.reducer;
