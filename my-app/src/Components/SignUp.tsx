import "../App.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import SignUpView from "./SignUpView";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [needsHelp, setNeedsHelp] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) navigate("/Home_Page");
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

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
    <SignUpView
      userType={userType}
      needsHelp={needsHelp}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
      handleUserTypeChange={handleUserTypeChange}
      handleNeedsHelpChange={handleNeedsHelpChange}
    />
  );
};

export default SignUp;
