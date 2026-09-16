import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { portfolio } from "../data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const track = sectionRef.current!.querySelector<HTMLElement>(".work-flex")!;
    const lastCard = track.lastElementChild as HTMLElement;
    const getScrollDistance = () => Math.max(
      0,
      lastCard.offsetLeft + lastCard.offsetWidth
        + parseFloat(getComputedStyle(track).paddingRight) - track.clientWidth
    );

    gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        id: "work",
      },
    });
  }, { scope: sectionRef });
  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {portfolio.projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Scope & tools</h4>
                <p>{project.description}</p>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
