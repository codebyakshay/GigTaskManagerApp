// src/store/feature/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../../models/task";
import { addTaskExtraReducers } from "./taskExtraBuilder";

export type TasksState = {
  items: Task[];
  loading: boolean;
  error?: string;
};

const initialState: TasksState = { items: [], loading: false };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    addTaskExtraReducers(builder);
  },
});

export const { setItems, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
