import { CustomUser } from "../features/DisplayedUserData";
import { NavigateFunction } from "react-router-dom";
import React from "react";

interface UserViewProps {
  navigate: NavigateFunction;
  user: CustomUser | null;
  signOut: () => void;
}

const UserView: React.FC<UserViewProps> = ({ navigate, user, signOut }) => {
  const needsHelp = user?.displayName && JSON.parse(user.displayName).needsHelp;
  const userType = user?.displayName && JSON.parse(user.displayName).userType;

  return (
    <div>
      <button className="go-back" onClick={() => navigate("/Home_Page")}>
        Go back
      </button>
      <div className="center-container">
        <h2 className="welcome">User: {user?.email}</h2>
        {userType && (
          <h3 className="welcome">
            User Type:
            {userType === "Consultant" && needsHelp
              ? "Consultant and Person who needs help"
              : userType}
          </h3>
        )}
        {(userType === "Person who needs help" ||
          (userType === "Consultant" && needsHelp) ||
          userType === "Consultant") && (
          <h3
            className="welcome linkUser"
            onClick={() => navigate("/Messages_Page")}
          >
            Messages
          </h3>
        )}
        {needsHelp && (
          <h3
            className="welcome linkUser"
            onClick={() => navigate("/Advertisement_Form")}
          >
            Create advertisement
          </h3>
        )}
        <button className="signOutBtn" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserView;
