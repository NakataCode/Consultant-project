import AfterHomeView from "./AfterHomeView";
import { AdvertisementData } from "../features/AdvertFormInputs";
import { auth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { CustomUser } from "../features/DisplayedUserData";
import { db } from "../firebase";
import Fuse from "fuse.js";
import { onAuthStateChanged } from "firebase/auth";
import { RootState } from "../features/storeTypes";
import { setSearchQuery } from "../features/SearchSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userType");
    if (user) {
      setUserType(JSON.parse(user));
    }
  }, [userEmail]);

  return (
    <AfterHomeView
      userEmail={userEmail}
      handleUserClick={handleUserClick}
      handleSearchChange={handleSearchChange}
      filteredAds={filteredAds}
      userType={userType}
    />
  );
};

export default AfterHome;
