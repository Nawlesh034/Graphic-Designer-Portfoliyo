import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap };

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function finePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: reducedMotion() ? "instant" : "smooth" });
}
