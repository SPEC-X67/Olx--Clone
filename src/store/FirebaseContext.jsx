import { createContext, useContext} from "react";
import { getAuth } from "firebase/auth";
import db from "../../firebase/config";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const auth = getAuth();
  
    return (
      <FirebaseContext.Provider value={{ auth, db }}>
        {children}
      </FirebaseContext.Provider>
    );
  };
  

export const useFirebase = () => useContext(FirebaseContext)