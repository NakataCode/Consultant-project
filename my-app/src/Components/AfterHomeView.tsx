import { AdvertisementData } from "../features/AdvertFormInputs";
import AdvDisplay from "./AdvDisplay";
import { CustomUser } from "../features/DisplayedUserData";
import { NavLink } from "react-router-dom";
import "../Styles/Adv.css";

interface AfterHomeViewProps {
  filteredAds: AdvertisementData[];
  userEmail: string | null;
  userType: CustomUser | [];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserClick: () => void;
}

const AfterHomeView: React.FC<AfterHomeViewProps> = ({
  filteredAds,
  userEmail,
  userType,
  handleSearchChange,
  handleUserClick,
}) => {
  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <NavLink to="/Home_Page">-Consultant-</NavLink>
        </h1>

        <ul className="navLinks">
          <li>
            {userEmail && (
              <div className="linkUser">
                <a onClick={handleUserClick}>{userEmail}</a>
              </div>
            )}
          </li>
        </ul>
      </header>
      <div className="flex-2">
        <form className="search-form form-container">
          <input
            placeholder="Search"
            className="search"
            onChange={handleSearchChange}
          />
        </form>
        <hr></hr>
      </div>
      <div className="adv">
        {filteredAds &&
          filteredAds.map((ad: AdvertisementData, index: number) => (
            <AdvDisplay key={index} ads={ad} display={userType as CustomUser} />
          ))}
      </div>
      <hr></hr>
    </div>
  );
};

export default AfterHomeView;
