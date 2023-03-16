import "../App.css";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [needsHelp, setNeedsHelp] = useState(false);

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) navigate("/Home_Page");
  });

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("userEmail", userCredential.user?.email || "");

      const user = userCredential.user;

      let userTypeString = "";
      if (userType === "Consultant") {
        userTypeString = "Consultant";
      }
      if (needsHelp) {
        if (userTypeString !== "") {
          userTypeString += ", ";
        }
        userTypeString += "Person who needs help";
      }
      if (userType === "" && !needsHelp) {
        userTypeString = "Unknown";
      }

      localStorage.setItem(
        "userType",
        JSON.stringify({ email, userType, needsHelp })
      );

      await updateProfile(user, {
        displayName: JSON.stringify({ email, userType, needsHelp }),
      });

      navigate("/Home_Page");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(e.target.value);
  };

  const handleNeedsHelpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsHelp(e.target.checked);
  };

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
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="options">
            <label>What type of person are you:</label>

            <label className="labelSign" htmlFor="consultant">
              <input
                type="checkbox"
                id="consultant"
                className="checkbox"
                value="Consultant"
                checked={userType === "Consultant"}
                onChange={handleUserTypeChange}
              />
              Consultant
            </label>
            <br />

            <label className="labelSign" htmlFor="help">
              <input
                type="checkbox"
                id="help"
                className="checkbox"
                value="Help"
                checked={needsHelp}
                onChange={handleNeedsHelpChange}
              />
              Person who needs help
            </label>
          </fieldset>

          <button onClick={handleSignUp} className="signBtn" type="submit">
            Sign Up
          </button>
          <span>
            Already have an account?
            <Link to="/sign_In"> Sign in</Link>
          </span>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
