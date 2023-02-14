import { NavLink } from "react-router-dom";
import "../App.css";

const Navbar: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1 className="logo">
          <NavLink to="/">-Consultant-</NavLink>
        </h1>
        <ul className="main-nav">
          <li>
            <NavLink to="sign_In">Sign In</NavLink>
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
