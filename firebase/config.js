import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR6ZaoNqSv4wxG4Y07fd1ozEkX2U_L_RI",
  authDomain: "olx-clone-x67.firebaseapp.com",
  projectId: "olx-clone-x67",
  storageBucket: "olx-clone-x67.firebasestorage.app",
  messagingSenderId: "251342869150",
  appId: "1:251342869150:web:54b0201cb70812cb47a18f"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;