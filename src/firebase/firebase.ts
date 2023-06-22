// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlpqkg5-veJttFxQ-Zjc6JopoyCvlGvxs",
  authDomain: "auth-e0513.firebaseapp.com",
  projectId: "auth-e0513",
  storageBucket: "auth-e0513.appspot.com",
  messagingSenderId: "941832713385",
  appId: "1:941832713385:web:9f00d80a7f9259140aa5b8",
  measurementId: "G-R6FCLNH017",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
