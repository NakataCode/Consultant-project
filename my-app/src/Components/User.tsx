import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../App.css";

interface CustomUser {
  email: string | null;
}
const User: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) setUser(currentUser);
    else navigate("/sign_In");
  });
  return (
    <div className="center-container">
      <h2 className="welcome">User: {user?.email}</h2>
      <button className="signOutBtn" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
};
export default User;
