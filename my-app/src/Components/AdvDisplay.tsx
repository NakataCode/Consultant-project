import { AdvertisementData } from "./AdvertFormInputs";

import "../Styles/Adv.css";

interface AdvertisementDisplayProps {
  ads: AdvertisementData;
}

const AdvDisplay: React.FC<AdvertisementDisplayProps> = ({ ads }) => {
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
    </div>
  );
};

export default AdvDisplay;
