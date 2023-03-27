import { auth } from "../firebase";
import { clearMessages } from "../features/Message";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../Styles/Messages.css";
import { Message } from "../features/storeTypes";
import { sendMessage } from "../features/Message";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MessagesView from "./MessagesView";

function Messages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const userEmail = auth.currentUser?.email || "";

  const fetchMessages = () => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("receiver", "==", userEmail));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.docs.forEach((doc) => {
        const messageData = doc.data() as Message;
        if (messageData.receiver === userEmail) {
          newMessages.push({ ...messageData, id: doc.id });
        }
      });

      newMessages.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setLocalMessages(newMessages);
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
  }, [userEmail]);

  return <MessagesView localMessages={localMessages} navigate={navigate} />;
}

export default Messages;
