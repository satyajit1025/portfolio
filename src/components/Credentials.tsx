import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiAmazonwebservices, SiGooglecloud } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { portfolio } from "../data/portfolio";
import "./styles/Credentials.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function positionCertificationPreview(event: ReactPointerEvent<HTMLElement>, entering = false) {
  if (event.pointerType !== "mouse") return;
  const card = event.currentTarget;
  const preview = card.querySelector<HTMLElement>(".certification-preview");
  if (!preview) return;
  const bounds = card.getBoundingClientRect();
  const radius = preview.offsetWidth / 2;
  const x = Math.max(radius, Math.min(bounds.width - radius, event.clientX - bounds.left));
  preview.style.setProperty("--preview-x", `${x - bounds.width / 2}px`);
  preview.style.setProperty("--preview-y", `${event.clientY - bounds.top - bounds.height / 2}px`);
  preview.style.setProperty("--preview-move-duration", entering ? "0s" : "0.25s");
}

const Credentials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      sectionRef.current?.querySelectorAll(".credentials-column").forEach((column) => {
        column.querySelectorAll<HTMLElement>("[data-credential-reveal]").forEach((element) => {
          gsap.fromTo(element, { opacity: 0, y: 26 }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "top 65%",
              scrub: 0.6,
            },
          });
        });
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
  <section ref={sectionRef} className="credentials-section section-container" aria-label="Education and credentials">
    <div className="credentials-column">
      <h2 data-credential-reveal>Education</h2>
      {portfolio.education.map((education) => (
        <article key={education.course} data-credential-reveal>
          <h3>{education.course}</h3>
          <p>{education.institution}</p>
          <p className="credential-date">{education.dates}</p>
        </article>
      ))}
      {/* <h3 className="credentials-label">How I work</h3>
      <p>{portfolio.softSkills.join(" · ")}</p> */}
    </div>
    <div className="credentials-column certifications-column">
      <h2 data-credential-reveal>Certifications</h2>
      {portfolio.credentials.map((credential) => (
        <article
          className="certification-card"
          key={credential.name}
          tabIndex={0}
          onPointerEnter={(event) => positionCertificationPreview(event, true)}
          onPointerMove={positionCertificationPreview}
          data-credential-reveal
        >
          <h3>{credential.name}</h3>
          <p>{credential.issuer}</p>
          <a
            className="credential-link"
            href={credential.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Show credentials for ${credential.name} (opens in a new tab)`}
            title={`Show credentials for ${credential.name}`}
          >
            <FiExternalLink aria-hidden="true" />
          </a>
          <div className="certification-preview" aria-hidden="true">
            <div className="certification-logo">
            {credential.issuer === "Google Cloud" ? (
              <SiGooglecloud className="certification-google-logo" />
            ) : credential.issuer === "Amazon Web Services" ? (
              <SiAmazonwebservices className="certification-aws-logo" />
            ) : credential.issuer === "Wadhwani Foundation" ? (
              <img src="/images/certifications/wadhwani-foundation.webp" alt="" width="96" height="64" />
            ) : credential.issuer === "Masai School" ? (
              <img src="/images/certifications/masai.png" alt="" width="74" height="48" />
            ) : null}
            </div>
          </div>
        </article>
      ))}
      <div
        className="certification-card certification-achievements"
        tabIndex={0}
        onPointerEnter={(event) => positionCertificationPreview(event, true)}
        onPointerMove={positionCertificationPreview}
        data-credential-reveal
      >
        <h3 className="credentials-label">Masai School achievements</h3>
        <p>{portfolio.achievements.join(" · ")}</p>
        <div className="certification-preview" aria-hidden="true">
          <div className="certification-logo">
            <img src="/images/certifications/masai.png" alt="" width="74" height="48" />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Credentials;
