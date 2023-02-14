import "../App.css";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="containerSignIn">
        <form action="index.html" method="post">
          <h1 className="heading">Sign In</h1>

          <fieldset className="info">
            <label htmlFor="email">Email:</label>
            <input type="email" name="user_email" />

            <label htmlFor="password">Password:</label>
            <input type="password" name="user_password" />
          </fieldset>
          <button className="signBtn" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
