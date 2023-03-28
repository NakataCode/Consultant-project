import { auth } from "../firebase";
import { clearMessages } from "../features/Message";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { deleteMessageFromFirebase } from "../features/deleteMsg";
import { Message } from "../features/storeTypes";
import MessagesView from "./MessagesView";
import "../Styles/Messages.css";
import { sendMessage } from "../features/Message";
import { saveMessageToFirebase } from "../features/saveMessageToFirebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Messages() {
  const [showResponseArea, setShowResponseArea] = useState<number | null>(null);
  const [responseText, setResponseText] = useState<string[]>([]);

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
          newMessages.push({
            ...messageData,
            id: doc.id,
            adTitle: messageData.adTitle,
          });
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

  const handleRespondClick = (index: number) => {
    setShowResponseArea((prevState) => (prevState === index ? null : index));
  };

  const handleSendResponse = async (
    messageData: Message,
    responseIndex: number
  ) => {
    const createdAt = new Date();
    const createdAtISOString = createdAt.toISOString();
    const responseMessageData = {
      message: responseText[responseIndex],
      email: userEmail,
      sender: userEmail,
      receiver: messageData.sender,
      adId: messageData.adId,
      adTitle: messageData.adTitle || "",
      createdAt: createdAtISOString,
    };
    await saveMessageToFirebase(responseMessageData);
    dispatch(sendMessage([responseMessageData as Message]));
    setShowResponseArea(null);
    setResponseText(
      responseText.map((_, index) => (index === responseIndex ? "" : _))
    );
  };

  const handleDeleteMessage = async (messageId: string) => {
    await deleteMessageFromFirebase(messageId);
    setLocalMessages(
      localMessages.filter((message) => message.id !== messageId)
    );
  };
  const handleResponseTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newResponseText = [...responseText];
    newResponseText[index] = e.target.value;
    setResponseText(newResponseText);
  };

  return (
    <MessagesView
      localMessages={localMessages}
      navigate={navigate}
      showResponseArea={showResponseArea}
      responseText={responseText}
      handleRespondClick={handleRespondClick}
      handleSendResponse={handleSendResponse}
      handleDeleteMessage={handleDeleteMessage}
      handleResponseTextChange={handleResponseTextChange}
    />
  );
}

export default Messages;
