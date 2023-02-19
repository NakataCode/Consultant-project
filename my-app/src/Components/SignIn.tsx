import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("userEmail", userCredential.user?.email || "");
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/Home_Page");
  });

  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="containerSignIn">
        <section>
          <h1 className="heading">Sign In</h1>

          <fieldset className="info">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          <button onClick={handleSignIn} className="signBtn" type="submit">
            Sign In
          </button>
          <span>
            Dont have an account?
            <Link to="/sign_Up"> Sign up</Link>
          </span>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
