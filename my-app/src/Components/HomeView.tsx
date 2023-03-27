import { AdvertisementData } from "../features/AdvertFormInputs";
import AdvDisplay from "./AdvDisplay";
import Navbar from "./Navbar";
import { CustomUser } from "../features/DisplayedUserData";

interface HomeViewProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredAds: AdvertisementData[];
  userType: CustomUser | [];
}

const HomeView: React.FC<HomeViewProps> = ({
  handleSearchChange,
  filteredAds,
  userType,
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
