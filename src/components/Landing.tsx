import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { portfolio } from "../data/portfolio";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {portfolio.firstName.toUpperCase()}
              <br />
              <span>{portfolio.lastName.toUpperCase()}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Quality-Focused</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">QA Engineer</div>
              <div className="landing-h2-2">SDET</div>
            </h2>
            <h2>
              <div className="landing-h2-info">SDET</div>
              <div className="landing-h2-info-1">QA Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
