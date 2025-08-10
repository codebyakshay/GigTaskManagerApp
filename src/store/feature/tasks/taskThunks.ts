// src/store/feature/tasks/taskThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../../libs/firebase";
import type { Priority, Task } from "../../../models/task";

const uidOrThrow = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not signed in");
  return uid;
};

const toISO = (v: any) =>
  v?.toDate?.()
    ? v.toDate().toISOString()
    : v
    ? new Date(v).toISOString()
    : undefined;

const mapDoc = (d: any): any => {
  const x = d.data();
  return {
    id: d.id,
    title: x.title,
    description: x.description,
    priority: x.priority,
    completed: x.completed,
    // store as ISO strings (serializable)
    dueDate: toISO(x.dueDate)!,
    createdAt: toISO(x.createdAt),
    updatedAt: toISO(x.updatedAt),
  };
};

// One-time fetch (earliest → latest)
export const fetchTasksOnce = createAsyncThunk("tasks/fetchOnce", async () => {
  const uid = uidOrThrow();
  const q = query(
    collection(db, `users/${uid}/tasks`),
    orderBy("dueDate", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
});

// Create
export const createTask = createAsyncThunk(
  "tasks/create",
  async (input: {
    title: string;
    description: string;
    dueDate: Date;
    priority: Priority;
  }) => {
    const uid = uidOrThrow();
    const ref = await addDoc(collection(db, `users/${uid}/tasks`), {
      ...input,
      completed: false,
      dueDate: Timestamp.fromDate(input.dueDate),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return ref.id;
  }
);

// Update
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, patch }: { id: string; patch: Partial<Omit<Task, "id">> }) => {
    const uid = uidOrThrow();
    const toWrite: any = { ...patch, updatedAt: Timestamp.now() };
    if (patch.dueDate instanceof Date) {
      toWrite.dueDate = Timestamp.fromDate(patch.dueDate);
    }
    await updateDoc(doc(db, `users/${uid}/tasks/${id}`), toWrite);
  }
);

// Toggle complete
export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async ({ id, completed }: { id: string; completed: boolean }) => {
    const uid = uidOrThrow();
    await updateDoc(doc(db, `users/${uid}/tasks/${id}`), {
      completed,
      updatedAt: Timestamp.now(),
    });
  }
);

// Delete
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    const uid = uidOrThrow();
    await deleteDoc(doc(db, `users/${uid}/tasks/${id}`));
  }
);
