// src/libs/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const { getReactNativePersistence } = require("firebase/auth");

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApPrdv3b3pdlnmoK5NY7n45RPt6BigOt8",
  authDomain: "gigtaskmanagerapp.firebaseapp.com",
  projectId: "gigtaskmanagerapp",
  storageBucket: "gigtaskmanagerapp.firebasestorage.app", // fine to keep
  messagingSenderId: "429059912239",
  appId: "1:429059912239:web:2ff7b3d60a0761b648ccda",
  measurementId: "G-2T3QZ622PR", // unused in RN
};

// Re-use app if hot reloaded
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth with AsyncStorage persistence (RN)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore with offline cache (counts as “local storage”)
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
  experimentalAutoDetectLongPolling: true, // helps on some RN networks
});
