import { AdvertisementData } from "./AdvertFormInputs";
import { CustomUser } from "./DisplayedUserData";
import "../Styles/Adv.css";
import { useState } from "react";

interface AdvertisementDisplayProps {
  ads: AdvertisementData;
  display: CustomUser;
}

const AdvDisplay: React.FC<AdvertisementDisplayProps> = ({ ads, display }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
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
        <textarea
          className="input-display"
          placeholder="If you are interested, write here!"
          value={answer}
          onChange={handleAnswerChange}
          required
        />
      ) : null}
    </div>
  );
};

export default AdvDisplay;
