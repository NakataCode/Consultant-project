import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../App.css";
import { CustomUser } from "./interfaceUser";

const User: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) setUser(currentUser);
    else navigate("/sign_In");
  });

  const userType = user?.displayName && JSON.parse(user.displayName).userType;
  const needsHelp = user?.displayName && JSON.parse(user.displayName).needsHelp;

  return (
    <div>
      <button className="go-back" onClick={() => navigate("/Home_Page")}>
        Go back
      </button>
      <div className="center-container">
        <h2 className="welcome">User: {user?.email}</h2>
        {userType && <h3 className="welcome">User Type: {userType}</h3>}
        {needsHelp && (
          <h3
            className="welcome linkUser"
            onClick={() => navigate("/Advertisement_Form")}
          >
            Create advertisement
          </h3>
        )}
        <button className="signOutBtn" onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default User;
