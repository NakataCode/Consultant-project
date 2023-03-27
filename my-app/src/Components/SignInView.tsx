import { Link } from "react-router-dom";
import React from "react";

interface SignInViewProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
}

const SignInView: React.FC<SignInViewProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSignIn,
}) => {
  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="containerSignIn">
        <section>
          <h1 className="heading">Sign In</h1>

          <fieldset className="info">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          <button onClick={handleSignIn} className="signBtn" type="submit">
            Sign In
          </button>
          <span>
            Dont have an account?
            <Link to="/sign_Up"> Sign up</Link>
          </span>
        </section>
      </div>
    </div>
  );
};
export default SignInView;
