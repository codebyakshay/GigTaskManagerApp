import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import type { Task, Priority } from "../models/task";

function colRef() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not signed in");
  return collection(db, `users/${uid}/tasks`);
}

// Create
export async function createTask(
  input: Omit<Task, "id" | "createdAt" | "updatedAt" | "completed">
) {
  const payload = {
    ...input,
    completed: false,
    dueDate: Timestamp.fromDate(input.dueDate),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  const ref = await addDoc(colRef(), payload);
  return ref.id;
}

// Update (partial)
export async function updateTask(id: string, patch: Partial<Task>) {
  const ref = doc(colRef(), id);
  const toWrite: any = { ...patch, updatedAt: Timestamp.now() };
  if (patch.dueDate instanceof Date)
    toWrite.dueDate = Timestamp.fromDate(patch.dueDate);
  return updateDoc(ref, toWrite);
}

export function toggleCompleted(id: string, completed: boolean) {
  return updateTask(id, { completed });
}

export function deleteTask(id: string) {
  return deleteDoc(doc(colRef(), id));
}

// One-time list (earliest → latest)
export async function listTasksOnce() {
  const q = query(colRef(), orderBy("dueDate", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data: any = d.data();
    return {
      id: d.id,
      ...data,
      dueDate: data.dueDate?.toDate?.() ?? new Date(data.dueDate),
      createdAt: data.createdAt?.toDate?.(),
      updatedAt: data.updatedAt?.toDate?.(),
    } as Task;
  });
}

// Realtime subscribe (optional filters)
export function subscribeTasks(
  opts: { priority?: Priority; completed?: boolean } = {},
  cb: (tasks: Task[]) => void,
  onErr?: (e: any) => void
) {
  const parts: any[] = [orderBy("dueDate", "asc")];
  if (opts.priority) parts.unshift(where("priority", "==", opts.priority));
  if (opts.completed !== undefined)
    parts.unshift(where("completed", "==", opts.completed));

  const q = query(colRef(), ...parts);
  return onSnapshot(
    q,
    (snap) => {
      const tasks = snap.docs.map((d) => {
        const data: any = d.data();
        return {
          id: d.id,
          ...data,
          dueDate: data.dueDate?.toDate?.() ?? new Date(data.dueDate),
          createdAt: data.createdAt?.toDate?.(),
          updatedAt: data.updatedAt?.toDate?.(),
        } as Task;
      });
      cb(tasks);
    },
    onErr
  );
}
