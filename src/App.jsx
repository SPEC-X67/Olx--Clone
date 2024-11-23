import Home from "./Pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import { useEffect, useContext } from "react";
import { FirebaseContext } from "./store/FirebaseContext";
import Create from "../src/Pages/Create";
import ViewPost from "../src/Pages/ViewPost";
import SearchPage from "./Pages/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth, setUser } = useContext(FirebaseContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  });

  return (
    <div>
      <ToastContainer theme="colored"/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
