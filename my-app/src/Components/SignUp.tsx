import "../App.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/user");
  });

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/user");
  });

  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="container">
        <section>
          <h1 className="heading">Sign Up</h1>

          <fieldset className="info">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="options">
            <label>What type of person are you:</label>

            <label className="labelSign" htmlFor="consultant">
              <input type="checkbox" id="consultant" value="Consultant" />
              Consultant
            </label>
            <br />

            <label className="labelSign" htmlFor="help">
              <input type="checkbox" id="help" value="Help" />
              Who needs help
            </label>
          </fieldset>

          <button onClick={handleSignUp} className="signBtn" type="submit">
            Sign Up
          </button>
          <span>
            Alreday have an account?
            <Link to="/sign_In"> Sign in</Link>
          </span>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
