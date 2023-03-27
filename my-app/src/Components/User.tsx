import "../App.css";
import { auth } from "../firebase";
import { CustomUser } from "../features/DisplayedUserData";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserView from "./UserView";

const User: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/sign_In");
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <UserView user={user} navigate={navigate} signOut={() => signOut(auth)} />
  );
};

export default User;
