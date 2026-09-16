import { useEffect, useRef } from "react";
import { FiCheckCircle, FiCode, FiSearch } from "react-icons/fi";
import "./styles/About.css";
import { portfolio } from "../data/portfolio";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("about-in-view", entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-section" id="about" ref={sectionRef}>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <span className="about-wave" aria-hidden="true">👋</span>
        <p className="para">
          {portfolio.about}
        </p>
        <div className="about-quality-note">
          <span className="about-status-dot" aria-hidden="true" />
          Curious mind. Quality first.
        </div>
        <ul className="about-focus" aria-label="My testing approach">
          <li><FiSearch aria-hidden="true" /><span>Explore deeply</span></li>
          <li><FiCode aria-hidden="true" /><span>Automate smartly</span></li>
          <li><FiCheckCircle aria-hidden="true" /><span>Release confidently</span></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
