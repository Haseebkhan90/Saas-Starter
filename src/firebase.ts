import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTgUmeihZ__T5eGiuyXvx8IDErzq9CpPU",
  authDomain: "ticketpulse-24eb9.firebaseapp.com",
  projectId: "ticketpulse-24eb9",
  storageBucket: "ticketpulse-24eb9.appspot.com",
  messagingSenderId: "512616676365",
  appId: "1:512616676365:web:7800ea7070f0599906a944",
  measurementId: "G-F59GKTYJW2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
