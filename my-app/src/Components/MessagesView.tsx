import { Message } from "../features/storeTypes";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import "../Styles/Adv.css";

interface MessagesViewProps {
  localMessages: Message[];
  navigate: NavigateFunction;
  responseText: string[];
  showResponseArea: number | null;
  handleDeleteMessage: (messageId: string) => Promise<void>;
  handleRespondClick: (index: number) => void;
  handleResponseTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleSendResponse: (
    messageData: Message,
    responseIndex: number
  ) => Promise<void>;
}

const MessagesView: React.FC<MessagesViewProps> = ({
  localMessages,
  navigate,
  responseText,
  handleDeleteMessage,
  showResponseArea,
  handleRespondClick,
  handleResponseTextChange,
  handleSendResponse,
}) => {
  return (
    <div>
      <button className="go-back" onClick={() => navigate("/user")}>
        Go back
      </button>
      <div className="messages-container">
        <h1>Messages:</h1>
        {localMessages.map((messageData, index) => (
          <div key={index}>
            <p>
              <strong>Ad Title:</strong> {messageData.adTitle}
              <br />
              <strong>{messageData.email}:</strong> {messageData.message} <br />
            </p>
            <div>
              <button
                className="respond-btn"
                onClick={() => handleRespondClick(index)}
              >
                Respond
              </button>
              <button
                className="delete-btn"
                onClick={() =>
                  messageData.id && handleDeleteMessage(messageData.id)
                }
              >
                Delete
              </button>
            </div>

            {showResponseArea === index && (
              <div>
                <textarea
                  className="txt-area"
                  value={responseText[index] || ""}
                  onChange={(e) => handleResponseTextChange(e, index)}
                />
                <div className="center-btn">
                  <button
                    className="btn-send"
                    onClick={() => handleSendResponse(messageData, index)}
                  >
                    Send message
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MessagesView;
