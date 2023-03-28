import { AdvertisementData } from "../features/AdvertFormInputs";
import { CustomUser } from "../features/DisplayedUserData";
import React from "react";

interface AdvDisplayViewProps {
  ads: AdvertisementData;
  display: CustomUser;
  answer: string;
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => Promise<void>;
}

const AdvDisplayView: React.FC<AdvDisplayViewProps> = ({
  ads,
  display,
  answer,
  handleAnswerChange,
  handleSubmit,
}) => {
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

export default AdvDisplayView;
