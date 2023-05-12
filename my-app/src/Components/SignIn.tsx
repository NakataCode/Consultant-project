import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import SignInView from "./SignInView";
import { useNavigate } from "react-router-dom";

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

      if (userCredential.user?.displayName) {
        const userTypeData = JSON.parse(userCredential.user.displayName);
        localStorage.setItem("userType", JSON.stringify(userTypeData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) navigate("/Home_Page");
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <SignInView
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignIn={handleSignIn}
    />
  );
};

export default SignIn;
