import { AdvertisementData } from "../features/AdvertFormInputs";
import { auth, db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { CustomUser } from "../features/DisplayedUserData";
import Fuse from "fuse.js";
import HomeView from "./HomeView";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { RootState } from "../features/storeTypes";
import { setAdvertisements } from "../features/AdvertSlice";
import { setSearchQuery } from "../features/SearchSlice";
import { setSignedIn } from "../features/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const advertisements = useSelector(
    (state: RootState) => state.advertisements.advertisements
  );

  const fuse = new Fuse(advertisements, {
    keys: ["title", "description", "budget", "date"],
    threshold: 0.3,
  });

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const filteredAds = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : advertisements;

  const userType: CustomUser = useSelector((state: RootState) =>
    JSON.parse(localStorage.getItem("userType") || "{}")
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/Home_Page");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ads"), (snapshot) => {
      const ads = snapshot.docs.map((doc) => doc.data() as AdvertisementData);
      dispatch(setAdvertisements(ads));
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSignedIn(!!userType));
  }, [dispatch, userType]);

  useEffect(() => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/Home_Page");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <HomeView
      filteredAds={filteredAds}
      userType={userType}
      handleSearchChange={handleSearchChange}
    />
  );
};

export default Home;
