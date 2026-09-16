import { useEffect, useId, useState } from "react";
import "./styles/WhatIDo.css";
import { portfolio } from "../data/portfolio";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const sectionId = useId();

  useEffect(() => {
    // Desktop card space is reserved; refreshing on hover resets text reveals.
    if (window.innerWidth > 1024) return;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>I<span className="do-h2"> DO</span></div>
        </h2>
      </div>
      <div className="what-box">
        <div
          className="what-box-in"
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setActiveIndex(0);
          }}
        >
          <div className="what-border2" aria-hidden="true">
            <svg width="100%" height="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          {portfolio.capabilities.map((capability, index) => {
            const isActive = activeIndex === index;
            const panelId = `${sectionId}-panel-${index}`;
            const buttonId = `${sectionId}-button-${index}`;

            return (
              <div
                className={`what-content${isActive ? " what-content-active" : ""}`}
                key={capability.title}
              >
                <div className="what-border1" aria-hidden="true">
                  <svg width="100%" height="100%">
                    {index === 0 && <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />}
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>
                </div>
                <div className="what-corner" aria-hidden="true" />
                <div className="what-content-in">
                  <h3>
                    <button
                      className="what-toggle"
                      id={buttonId}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onPointerMove={(event) => {
                        // React to pointer movement, not headings moving during expansion.
                        if (event.pointerType === "mouse") setActiveIndex(index);
                      }}
                      onClick={(event) => {
                        const mouseHover = event.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                        setActiveIndex(mouseHover ? index : isActive ? null : index);
                      }}
                    >
                      {capability.title}
                      <span className="what-arrow" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="what-details"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isActive}
                    onTransitionEnd={(event) => {
                      if (window.innerWidth <= 1024 && event.target === event.currentTarget && event.propertyName === "grid-template-rows") ScrollTrigger.refresh();
                    }}
                  >
                    <div className="what-details-in">
                      <h4>Description</h4>
                      <p>{capability.description}</p>
                      <h5>Skillset & tools</h5>
                      <div className="what-content-flex">
                        {capability.tools.map((tool) => <div className="what-tags" key={tool}>{tool}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
