import AfterHomeView from "./AfterHomeView";
import { AdvertisementData } from "../features/AdvertFormInputs";
import { auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
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
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userType, setUserType] = useState<CustomUser | []>([]);

  const refreshKey = useSelector((state: RootState) => state.refresh.key);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const querySnapshot = await getDocs(collection(db, "ads"));
      const ads = querySnapshot.docs.map(
        (doc) => doc.data() as AdvertisementData
      );
      setAdvertisements(ads);
    };

    fetchAdvertisements();
  }, [refreshKey]);

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
      filteredAds={filteredAds}
      userEmail={userEmail}
      userType={userType}
      handleSearchChange={handleSearchChange}
      handleUserClick={handleUserClick}
    />
  );
};

export default AfterHome;
