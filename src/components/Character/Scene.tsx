import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { disposeObject } from "./utils/dispose";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // Each mount owns a scene, including Strict Mode's temporary mount.
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(rect.width, rect.height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, rect.width / rect.height, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let disposed = false;
    let character: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Mesh | undefined;
    let animations: ReturnType<typeof setAnimations> | undefined;
    let removeHover: (() => void) | undefined;
    let clearCharacterTimeline: (() => void) | undefined;
    let clearCareerTimeline: (() => void) | undefined;
    let introTimeout: ReturnType<typeof setTimeout> | undefined;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    let cancelTouchReturn: (() => void) | undefined;
    let frameId = 0;
    let isVisible = true;
    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress(setLoading);
    const loader = setCharacter(renderer, scene, camera);
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const rebuildTimelines = () => {
      if (!character || disposed) return;
      clearCharacterTimeline?.();
      clearCareerTimeline?.();
      clearCharacterTimeline = setCharTimeline(character, camera);
      clearCareerTimeline = setAllTimeline();
    };

    const loading = loader.loadCharacter();
    loading.then((gltf) => {
      if (!gltf || disposed) return;
      character = gltf.scene;
      scene.add(character);
      animations = setAnimations(gltf);
      if (hoverDivRef.current) removeHover = animations.hover(gltf, hoverDivRef.current);
      headBone = character.getObjectByName("spine006") || null;
      screenLight = character.getObjectByName("screenlight") as THREE.Mesh | undefined;
      rebuildTimelines();
      ScrollTrigger.refresh();
      progress.loaded().then(() => {
        if (disposed) return;
        introTimeout = setTimeout(() => {
          light.turnOnLights();
          animations?.startIntro();
        }, 2500);
      });
    }).catch((error) => {
      if (!disposed) console.error("Error loading GLTF model:", error);
    });

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => { mouse = { x, y }; });
    };
    let touchTarget: HTMLElement | null = null;
    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => { mouse = { x, y }; });
    };
    const detachTouchMove = () => {
      clearTimeout(debounce);
      touchTarget?.removeEventListener("touchmove", onTouchMove);
      touchTarget = null;
    };
    const onTouchStart = (event: TouchEvent) => {
      detachTouchMove();
      cancelTouchReturn?.();
      touchTarget = event.target as HTMLElement;
      debounce = setTimeout(() => {
        touchTarget?.addEventListener("touchmove", onTouchMove, { passive: true });
      }, 200);
    };
    const onTouchEnd = () => {
      detachTouchMove();
      cancelTouchReturn?.();
      cancelTouchReturn = handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize(renderer, camera, canvasDiv);
        // Revert only this scene's timelines, preserving Work and ScrollSmoother.
        rebuildTimelines();
        ScrollTrigger.refresh();
      }, 150);
    };

    const animate = () => {
      if (disposed || !isVisible || document.hidden) {
        frameId = 0;
        return;
      }
      const delta = Math.min(clock.getDelta(), 0.1);
      if (headBone) {
        handleHeadRotation(headBone, mouse.x, mouse.y, interpolation.x, interpolation.y, THREE.MathUtils.lerp);
        if (screenLight) light.setPointLight(screenLight);
      }
      animations?.mixer.update(delta);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    const updateRendering = () => {
      if (isVisible && !document.hidden && !disposed) {
        if (!frameId) {
          clock.start();
          frameId = requestAnimationFrame(animate);
        }
      } else {
        cancelAnimationFrame(frameId);
        frameId = 0;
        clock.stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateRendering();
    }, { rootMargin: "150px" });
    observer.observe(container);
    document.addEventListener("visibilitychange", updateRendering);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    const landingDiv = document.getElementById("landingDiv");
    landingDiv?.addEventListener("touchstart", onTouchStart, { passive: true });
    landingDiv?.addEventListener("touchend", onTouchEnd);
    landingDiv?.addEventListener("touchcancel", onTouchEnd);
    updateRendering();

    return () => {
      disposed = true;
      loader.cancel();
      progress.cancel();
      clearTimeout(introTimeout);
      clearTimeout(resizeTimeout);
      detachTouchMove();
      cancelTouchReturn?.();
      cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateRendering);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
      landingDiv?.removeEventListener("touchcancel", onTouchEnd);
      removeHover?.();
      clearCharacterTimeline?.();
      clearCareerTimeline?.();
      animations?.dispose();
      light.dispose();
      if (character) disposeObject(character);
      scene.clear();
      // compileAsync polls shader programs; dispose only after that work settles.
      loading.then(() => renderer.dispose(), () => renderer.dispose());
      renderer.domElement.remove();
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
