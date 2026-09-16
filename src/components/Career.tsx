import "./styles/Career.css";
import { portfolio } from "../data/portfolio";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {portfolio.experience.map((experience) => (
            <div className="career-info-box" key={experience.company}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{experience.role}</h4>
                  <h5>{experience.company}<br /><span>{experience.dates}</span></h5>
                </div>
                <h3>{experience.year}</h3>
              </div>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
