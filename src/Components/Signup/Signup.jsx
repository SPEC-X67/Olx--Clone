import { useState } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useFirebase } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth, db } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
        // Update the user's profile with the username
        await updateProfile(userCredential.user, { displayName: username });
  
        // Store additional user details
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          username,
          email,
          phone,
        });
  
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");

        navigate('/login')
        console.log('register sussfullyh..');
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
