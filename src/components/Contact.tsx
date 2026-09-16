import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { portfolio } from "../data/portfolio";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${portfolio.email}`} data-cursor="disable">
                {portfolio.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p><a href={portfolio.phoneHref} data-cursor="disable">{portfolio.phone}</a></p>
            <h4>Location</h4>
            <p>{portfolio.location}</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {[
              { label: "GitHub", url: portfolio.github },
              { label: "LinkedIn", url: portfolio.linkedin },
              { label: "Linktree", url: portfolio.links },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                {link.label} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              {portfolio.name}<br /><span>{portfolio.role}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
