import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/Home_Page");
      }
    });

    return unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
