import { createContext, useContext, useEffect, useState} from "react";
import { db, auth} from "../../firebase/config";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);  // Update user state when authentication state changes
      });

      // Cleanup the listener on component unmount
      return () => unsubscribe();
    }, [auth])
  
    return (
      <FirebaseContext.Provider value={{ auth, db, user, setUser}}>
        {children}
      </FirebaseContext.Provider>
    );
  };
  

export const useFirebase = () => useContext(FirebaseContext)