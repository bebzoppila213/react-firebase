import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeiUc-S52ItNaPFWGFkN21EKfOLEQ807A",
  authDomain: "todo-list-c87f5.firebaseapp.com",
  projectId: "todo-list-c87f5",
  storageBucket: "todo-list-c87f5.appspot.com",
  messagingSenderId: "1027634745508",
  appId: "1:1027634745508:web:f75c77aff486affde35631",
  measurementId: "G-BKVE5JYXGJ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);
