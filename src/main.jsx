import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseProvider } from "./store/FirebaseContext.jsx";
import { ProductProvider } from "./store/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ProductProvider>
  </StrictMode>
);
