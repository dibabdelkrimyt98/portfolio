// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "dib-portfolio-dev.firebaseapp.com",
  projectId: "dib-portfolio-dev",
  storageBucket: "dib-portfolio-dev.firebasestorage.app",
  messagingSenderId: "509244953058",
  appId: "1:509244953058:web:db7c46b1dd960d1d1d69bb",
  measurementId: "G-GM3DS7F130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);