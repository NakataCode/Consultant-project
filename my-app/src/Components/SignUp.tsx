import "../App.css";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="container">
        <form action="" method="post">
          <h1 className="heading">Sign Up</h1>

          <fieldset className="info">
            <label htmlFor="name">Username:</label>
            <input type="text" name="user_name" />

            <label htmlFor="email">Email:</label>
            <input type="email" name="user_email" />

            <label htmlFor="password">Password:</label>
            <input type="password" name="user_password" />
          </fieldset>

          <fieldset className="options">
            <label>What type of person are you:</label>

            <label className="labelSign" htmlFor="consultant">
              <input type="checkbox" id="consultant" value="Consultant" />
              Consultant
            </label>
            <br />

            <label className="labelSign" htmlFor="help">
              <input type="checkbox" id="help" value="Help" />
              Who needs help
            </label>
          </fieldset>

          <button className="signBtn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
