import { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {auth} =  useFirebase();

  const handleLogin = async(e) => {
    try {
      e.preventDefault();

      await signInWithEmailAndPassword(auth, email, password)

      setEmail('');
      setPassword('');
      
      navigate('/');
    } catch (error) {
      console.log("Error occur while login", error)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
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
          <button type='submit'>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
