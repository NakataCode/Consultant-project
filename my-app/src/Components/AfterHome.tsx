import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../App.css";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleUserClick = () => {
    navigate("/user");
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <NavLink to="/Home_Page">-Consultant-</NavLink>
        </h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <ul className="navLinks">
          <li>
            {user && (
              <div className="linkUser">
                <a onClick={handleUserClick}>{userEmail}</a>
              </div>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
};

export default HomePage;
