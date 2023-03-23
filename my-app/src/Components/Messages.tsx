import { auth } from "../firebase";
import { clearMessages } from "../features/Message";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../Styles/Messages.css";
import { Message } from "../features/storeTypes";
import { RootState } from "../features/storeTypes";
import { sendMessage } from "../features/Message";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Messages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.value);

  const fetchMessages = () => {
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("receiver", "==", auth.currentUser?.email || "")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const messageData = change.doc.data() as Message;
          if (messageData.receiver === auth.currentUser?.email) {
            newMessages.push(messageData);
          }
        }
      });
      dispatch(sendMessage(newMessages));
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeMessages = fetchMessages();

    return () => {
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
      dispatch(clearMessages());
    };
  }, []);

  return (
    <div>
      <button className="go-back" onClick={() => navigate("/user")}>
        Go back
      </button>
      <div className="container">
        <h1>Messages:</h1>
        {messages.map((messageData, index) => (
          <div key={index}>
            <p>
              <strong>{messageData.email}:</strong> {messageData.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
