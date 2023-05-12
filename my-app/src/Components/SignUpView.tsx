import { Link } from "react-router-dom";
import React from "react";

interface SignUpViewProps {
  needsHelp: boolean;
  userType: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleNeedsHelpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: () => void;
  handleUserTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({
  needsHelp,
  userType,
  setEmail,
  setPassword,
  handleNeedsHelpChange,
  handleSignUp,
  handleUserTypeChange,
}) => {
  return (
    <div>
      <Link to="/">
        <button className="back-btn">Go back</button>
      </Link>
      <div className="container">
        <section>
          <h1 className="heading">Sign Up</h1>
          <fieldset className="info">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="options">
            <label>What type of person are you:</label>

            <label className="labelSign" htmlFor="consultant">
              <input
                type="checkbox"
                id="consultant"
                className="checkbox"
                value="Consultant"
                checked={userType === "Consultant"}
                onChange={handleUserTypeChange}
              />
              Consultant
            </label>
            <br />

            <label className="labelSign" htmlFor="help">
              <input
                type="checkbox"
                id="help"
                className="checkbox"
                value="Help"
                checked={needsHelp}
                onChange={handleNeedsHelpChange}
              />
              Person who needs help
            </label>
          </fieldset>

          <button onClick={handleSignUp} className="signBtn" type="submit">
            Sign Up
          </button>
          <span>
            Already have an account?
            <Link to="/sign_In"> Sign in</Link>
          </span>
        </section>
      </div>
    </div>
  );
};
export default SignUpView;
