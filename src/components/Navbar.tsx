import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { useLoading } from "../context/LoadingProvider";
import { portfolio } from "../data/portfolio";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { isLoading } = useLoading();
  useEffect(() => {
    const instance = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      smoothTouch: 0.12,
      normalizeScroll: { allowNestedScroll: true },
      speed: 1,
      effects: false,
      autoResize: true,
      ignoreMobileResize: true,
    });
    smoother = instance;

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    const onLinkClick = (e: Event) => {
      e.preventDefault();
      const element = e.currentTarget as HTMLAnchorElement;
      const section = element.getAttribute("data-href");
      if (section) instance.scrollTo(section, true, "top top");
    };
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", onLinkClick);
    });
    // ScrollSmoother already refreshes on resize; avoid a second refresh per event.
    return () => {
      links.forEach((element) => element.removeEventListener("click", onLinkClick));
      instance.kill();
    };
  }, []);
  useEffect(() => {
    smoother.paused(isLoading);
  }, [isLoading]);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {portfolio.firstName}
        </a>
        <a
          href={`mailto:${portfolio.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {portfolio.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
