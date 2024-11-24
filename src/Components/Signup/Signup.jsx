import { useState } from "react";
import Logo from "../../assets/loginEntryPointChat.webp";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "../../store/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const { auth, db } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email || !phone || !password){
      return toast.warning("All fields are required")
    } 
    setLoad(true);

    try {
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: username });

      // Store additional user details
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        username,
        email,
        phone,
        uid: userCredential.user.uid,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/");
      toast.success("register sussfullyh..");
    } catch (error) {
      toast.error("Error signing up ", error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <div className="s-top">
          <img width="200px" height="200px" src={Logo}></img>
          <p>Close deals from the comfort of your home.</p>
        </div>
        <div className="s-end">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="fname"
              name="name"
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="fname"
              name="email"
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="lname"
              name="phone"
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="lname"
              name="password"
            />
            <br />
            <br />
            <div className="end-ctn">
              <button>{load ? "Signing.." : "Sign Up"}</button>
              <Link to={"/login"} className="login-lnk">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
