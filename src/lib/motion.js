import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap };

let lenisInstance = null;

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initSmoothScroll() {
  if (reducedMotion() || lenisInstance) return () => {};

  const lenis = new Lenis({ lerp: 0.15, wheelMultiplier: 1.1, anchors: true });
  const updateScrollTrigger = () => ScrollTrigger.update();
  const updateLenis = (time) => lenis.raf(time * 1000);

  lenis.on("scroll", updateScrollTrigger);
  gsap.ticker.add(updateLenis);
  lenisInstance = lenis;

  const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.cancelAnimationFrame(refreshFrame);
    gsap.ticker.remove(updateLenis);
    lenis.off("scroll", updateScrollTrigger);
    lenis.destroy();
    if (lenisInstance === lenis) lenisInstance = null;
  };
}

export function finePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance && !reducedMotion()) {
    lenisInstance.scrollTo(target, { offset: -80 });
    return;
  }

  target.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth" });
}

export function scrollToTop() {
  if (lenisInstance && !reducedMotion()) {
    lenisInstance.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: reducedMotion() ? "instant" : "smooth" });
}
