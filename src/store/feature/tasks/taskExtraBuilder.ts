// src/store/feature/tasks/taskExtraBuilderFile.ts
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TasksState } from "./tasksSlice";
import { fetchTasksOnce } from "./taskThunks";

export function addTaskExtraReducers(
  builder: ActionReducerMapBuilder<TasksState>
) {
  builder
    .addCase(fetchTasksOnce.pending, (s) => {
      s.loading = true;
      s.error = undefined;
    })
    .addCase(fetchTasksOnce.fulfilled, (s, a) => {
      s.items = a.payload;
      s.loading = false;
    })
    .addCase(fetchTasksOnce.rejected, (s, a) => {
      s.error = String(a.error.message);
      s.loading = false;
    });
}
