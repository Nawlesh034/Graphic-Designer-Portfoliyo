import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/motion";

/**
 * Types and deletes through a list of phrases. Motion-sensitive visitors get
 * the first phrase, held still.
 */
export default function TypingLine({ phrases, className = "" }) {
  const [text, setText] = useState(phrases[0]);
  const reduced = useRef(typeof window !== "undefined" ? reducedMotion() : false);

  useEffect(() => {
    if (reduced.current) return undefined;

    let timer = null;
    let phraseIndex = 0;
    let chars = 0;
    let deleting = false;

    setText("");

    const step = () => {
      const phrase = phrases[phraseIndex];
      chars = deleting ? chars - 1 : chars + 1;
      setText(phrase.slice(0, Math.max(chars, 0)));

      if (!deleting && chars === phrase.length) {
        deleting = true;
        timer = window.setTimeout(step, 1800);
        return;
      }

      if (deleting && chars === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(step, 320);
        return;
      }

      timer = window.setTimeout(step, deleting ? 24 : 56);
    };

    timer = window.setTimeout(step, 1100);
    return () => window.clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
      <span className="sr-only">{phrases.join(", ")}.</span>
    </span>
  );
}