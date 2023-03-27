import { AdvertisementData } from "../features/AdvertFormInputs";
import { auth } from "../firebase";
import { CustomUser } from "../features/DisplayedUserData";
import "../Styles/Adv.css";
import { Message } from "../features/storeTypes";
import { sendMessage } from "../features/Message";
import { saveMessageToFirebase } from "../features/saveMessageToFirebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AdvDisplayView from "./AdvDisplayView";

interface AdvertisementDisplayProps {
  ads: AdvertisementData;
  display: CustomUser;
}

const AdvDisplay: React.FC<AdvertisementDisplayProps> = ({ ads, display }) => {
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    const createdAt = new Date();
    const createdAtISOString = createdAt.toISOString();
    const messageData = {
      message: answer,
      email: display.email,
      sender: auth.currentUser?.email || "",
      receiver: ads.createdBy,
      adId: ads.id,
      createdAt: createdAtISOString,
    };
    await saveMessageToFirebase(messageData);
    dispatch(sendMessage([messageData as Message]));
    setAnswer("");
  };

  return (
    <AdvDisplayView
      ads={ads}
      display={display}
      answer={answer}
      handleAnswerChange={handleAnswerChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AdvDisplay;
