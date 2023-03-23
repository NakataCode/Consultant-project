import { AdvertisementData } from "./AdvertFormInputs";
import { auth } from "../firebase";
import { CustomUser } from "./DisplayedUserData";
import "../Styles/Adv.css";
import { Message } from "../features/storeTypes";
import { sendMessage } from "../features/Message";
import { saveMessageToFirebase } from "../features/saveMessageToFirebase";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
    <div className="adv-container">
      <span className="user user-bottom-space">
        Created by: {ads.createdBy}
      </span>

      {ads.images.map((imageUrl, index) => (
        <img
          src={imageUrl}
          className="adv-img"
          alt="Advertisement"
          key={index}
        />
      ))}
      <h3 className="user">{ads.title}</h3>
      <p className="user">{ads.description}</p>
      <p className="user">Budget: {ads.budget}$</p>
      <p className="user">Date: {ads.date}</p>

      {display.userType === "Consultant" ||
      display.userType === "Consultant and Person who needs help" ? (
        <div className="adv-container-second">
          <textarea
            className="input-display"
            placeholder="If you are interested, write here!"
            value={answer}
            onChange={handleAnswerChange}
            required
          />
          <button className="go-back-second" onClick={handleSubmit}>
            Send message
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AdvDisplay;
