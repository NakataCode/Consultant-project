import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const navigate = useNavigate();

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
        <form className="search-form form-container " onSubmit={handleSearch}>
          <input
            placeholder="Search"
            className="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>
        <hr></hr>
      </div>
    </div>
  );
};

export default HomePage;
