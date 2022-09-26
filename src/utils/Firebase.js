import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjkZDWxYweffoEjZ3mGezL6LdtESzPVzM",
  authDomain: "skichat-c5669.firebaseapp.com",
  projectId: "skichat-c5669",
  storageBucket: "skichat-c5669.appspot.com",
  messagingSenderId: "380180731002",
  appId: "1:380180731002:web:4023d815a6452ed25997c3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();