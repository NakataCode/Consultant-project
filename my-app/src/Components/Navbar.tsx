import "../App.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <NavLink to="/">-Consultant-</NavLink>
        </h1>
        <ul className="navLinks">
          <li>
            <NavLink to="sign_In">Sign In</NavLink>
          </li>
          <li className="slash">
            <NavLink to="/">/</NavLink>
          </li>
          <li>
            <NavLink to="sign_Up">Sign Up</NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
