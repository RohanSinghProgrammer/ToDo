import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVEk4OfPd4smy_vII3zliNSbpXpSUYm3o",
  authDomain: "next-todo-41726.firebaseapp.com",
  projectId: "next-todo-41726",
  storageBucket: "next-todo-41726.appspot.com",
  messagingSenderId: "539609204613",
  appId: "1:539609204613:web:2af98a75e414653f24e6ec",
  measurementId: "G-9691PCZFYD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
