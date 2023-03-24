import { AdvertisementData } from "./AdvertFormInputs";
import AdvDisplay from "./AdvDisplay";
import { CustomUser } from "./DisplayedUserData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Fuse from "fuse.js";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../features/storeTypes";
import "../Styles/Adv.css";
import { setSearchQuery } from "../features/SearchSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AfterHome: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const [userType, setUserType] = useState<CustomUser | []>([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const fuse = new Fuse(advertisements, {
    keys: ["title", "description", "budget", "date"],
    threshold: 0.3,
  });

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const filteredAds = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : advertisements;

  const handleUserClick = () => {
    navigate("/user");
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, [userEmail]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ads"), (snapshot) => {
      const ads = snapshot.docs.map((doc) => doc.data() as AdvertisementData);
      setAdvertisements(ads);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userType");
    if (user) {
      setUserType(JSON.parse(user));
    }
  }, [userEmail]);

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

export default AfterHome;
