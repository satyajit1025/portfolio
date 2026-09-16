import {
  FaGithub,
  FaLink,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { portfolio } from "../data/portfolio";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    const cleanups: (() => void)[] = [];
    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      let frameId = 0;
      let lastTime = 0;
      const updatePosition = (time: number) => {
        const amount = 1 - Math.exp(-Math.min(time - lastTime, 100) / 90);
        lastTime = time;
        currentX += (mouseX - currentX) * amount;
        currentY += (mouseY - currentY) * amount;
        const settled = Math.abs(mouseX - currentX) < 0.05 && Math.abs(mouseY - currentY) < 0.05;
        if (settled) {
          currentX = mouseX;
          currentY = mouseY;
        }
        link.style.setProperty("--siX", `${currentX}px`);
        link.style.setProperty("--siY", `${currentY}px`);
        frameId = settled ? 0 : requestAnimationFrame(updatePosition);
      };
      const startAnimation = () => {
        if (frameId) return;
        lastTime = performance.now();
        frameId = requestAnimationFrame(updatePosition);
      };
      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x - rect.width / 2;
          mouseY = y - rect.height / 2;
        } else {
          mouseX = 0;
          mouseY = 0;
        }
        startAnimation();
      };
      const onMouseLeave = () => {
        mouseX = 0;
        mouseY = 0;
        startAnimation();
      };
      elem.addEventListener("mousemove", onMouseMove, { passive: true });
      elem.addEventListener("mouseleave", onMouseLeave);
      cleanups.push(() => {
        cancelAnimationFrame(frameId);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
        link.style.removeProperty("--siX");
        link.style.removeProperty("--siY");
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={portfolio.github} target="_blank" rel="noopener noreferrer" aria-label="Satyajit Sahu on GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Satyajit Sahu on LinkedIn">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href={portfolio.links} target="_blank" rel="noopener noreferrer" aria-label="Satyajit Sahu on Linktree">
            <FaLink />
          </a>
        </span>
      </div>
      <a className="resume-button" href={portfolio.resume} target="_blank" rel="noopener noreferrer">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
