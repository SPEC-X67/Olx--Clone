import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseContext } from "./store/FirebaseContext.js";
import firebase from '../firebase/config.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{firebase}}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
);
