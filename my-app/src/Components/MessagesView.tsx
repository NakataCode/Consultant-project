import React from "react";
import { Message } from "../features/storeTypes";
import { NavigateFunction } from "react-router-dom";

interface MessagesViewProps {
  localMessages: Message[];
  navigate: NavigateFunction;
}

const MessagesView: React.FC<MessagesViewProps> = ({
  localMessages,
  navigate,
}) => {
  return (
    <div>
      <button className="go-back" onClick={() => navigate("/user")}>
        Go back
      </button>
      <div className="container">
        <h1>Messages:</h1>
        {localMessages.map((messageData, index) => (
          <div key={index}>
            <p>
              <strong>{messageData.email}:</strong> {messageData.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesView;
