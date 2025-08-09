// src/data/tasks.ts

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority?: Priority;
  isCompleted: boolean;
};

export const Data = [
  {
    id: 1,
    title: "Assignment UI/UX",
    description: "Polish dashboard tiles and custom bottom tabs.",
    dueDate: new Date(Date.now() + 2 * 86_400_000), // +2 days
    priority: "medium",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Implement Firebase Auth",
    description: "Email/password signup + login with error states.",
    dueDate: new Date(Date.now() + 1 * 86_400_000), // +1 day
    priority: "high",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Task CRUD & Filters",
    description: "Firestore CRUD and filter by status/priority.",
    dueDate: new Date(Date.now() + 5 * 86_400_000), // +5 days
    priority: "low",
    isCompleted: false,
  },
] satisfies Task[];
