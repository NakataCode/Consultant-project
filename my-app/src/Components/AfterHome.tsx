import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdvDisplay from "./AdvDisplay";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AdvertisementData } from "./AdvertFormInputs";
import "../Styles/Adv.css";

const AfterHome: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);

  const navigate = useNavigate();

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
          <input placeholder="Search" className="search" />
        </form>
        <hr></hr>
      </div>
      <div className="adv">
        {advertisements &&
          advertisements.map((ad: AdvertisementData, index: number) => (
            <AdvDisplay key={index} ads={ad} />
          ))}
      </div>
      <hr></hr>
    </div>
  );
};

export default AfterHome;
