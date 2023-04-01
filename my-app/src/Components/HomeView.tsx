import AdvDisplay from "./AdvDisplay";
import { AdvertisementData } from "../features/AdvertFormInputs";
import { CustomUser } from "../features/DisplayedUserData";
import Navbar from "./Navbar";

interface HomeViewProps {
  filteredAds: AdvertisementData[];
  userType: CustomUser | [];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  filteredAds,
  userType,
  handleSearchChange,
}) => {
  return (
    <div>
      <Navbar />

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

export default HomeView;
