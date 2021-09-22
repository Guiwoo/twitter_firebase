import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  //apiKey: "AIzaSyC3qyvRTL4aGA35sGxqoRUnWvrB8M9Qyjs",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const myFirebaseApp = initializeApp(firebaseConfig);
export const dbService = getFirestore();
export const authService = getAuth();
export const storageService = getStorage();
