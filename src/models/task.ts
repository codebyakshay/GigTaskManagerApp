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

// 👉 What we keep in Redux (no Date objects)
export type TaskEntity = Omit<Task, "dueDate" | "createdAt" | "updatedAt"> & {
  dueDate: string; // ISO
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
};
