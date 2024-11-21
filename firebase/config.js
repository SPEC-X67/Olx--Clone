import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR6ZaoNqSv4wxG4Y07fd1ozEkX2U_L_RI",
  authDomain: "olx-clone-x67.firebaseapp.com",
  projectId: "olx-clone-x67",
  storageBucket: "olx-clone-x67.appspot.com",
  messagingSenderId: "251342869150",
  appId: "1:251342869150:web:54b0201cb70812cb47a18f"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);