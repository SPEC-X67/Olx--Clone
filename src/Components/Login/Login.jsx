import { useState } from "react";
import Logo from "../../assets/loginEntryPointChat.webp";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../store/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useFirebase();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.warning("All fields are required.")
      return;
    }
    
    setLoading(true);

    try {

      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");

      navigate("/");
      toast.success("Login Successfull.")
    } catch (error) {
      toast.error("Login failed. Please try again.",error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="loginParentDiv">
        <div className="greet">
          <img width="200px" height="200px" src={Logo} />
          <p>Help us become one of the safest places to buy and sell</p>
        </div>
        <div className="form-ctn">
          <form onSubmit={handleLogin}>
            <div className="formx">
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            </div>
            <button type="submit">{loading ? "Loging...": "Login"}</button>
          </form>
          <Link to="/signup" className="signup-link">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
