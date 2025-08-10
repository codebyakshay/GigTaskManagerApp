// src/features/tasks/task.types.ts
import type { Timestamp } from "firebase/firestore";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateTaskInput = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "completed"
>;

export type TaskDoc = {
  title: string;
  description: string;
  dueDate: Timestamp;
  priority: Priority;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
