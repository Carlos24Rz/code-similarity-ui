"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ENV_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_ENV_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_ENV_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_ENV_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_ENV_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_ENV_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);