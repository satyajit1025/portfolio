import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    let frameId = 0;
    let lastTime = performance.now();
    const startLoop = () => {
      if (frameId || hover || document.hidden) return;
      lastTime = performance.now();
      frameId = requestAnimationFrame(loop);
    };
    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      startLoop();
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    const loop = (time: number) => {
      frameId = 0;
      if (hover || document.hidden) return;
      const delta = Math.min(time - lastTime, 100);
      lastTime = time;
      if (!hover) {
        const amount = 1 - Math.exp(-delta / 90);
        cursorPos.x += (mousePos.x - cursorPos.x) * amount;
        cursorPos.y += (mousePos.y - cursorPos.y) * amount;
        const settled = Math.abs(mousePos.x - cursorPos.x) < 0.05 && Math.abs(mousePos.y - cursorPos.y) < 0.05;
        if (settled) {
          cursorPos.x = mousePos.x;
          cursorPos.y = mousePos.y;
        }
        setX(cursorPos.x);
        setY(cursorPos.y);
        if (!settled) frameId = requestAnimationFrame(loop);
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else startLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const cleanups: (() => void)[] = [];
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1, overwrite: true });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onMouseOut = () => {
        gsap.killTweensOf(cursor);
        cursorPos.x = Number(gsap.getProperty(cursor, "x"));
        cursorPos.y = Number(gsap.getProperty(cursor, "y"));
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
        startLoop();
      };
      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
      cleanups.push(() => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    });
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf(cursor);
      cursor.classList.remove("cursor-disable", "cursor-icons");
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
