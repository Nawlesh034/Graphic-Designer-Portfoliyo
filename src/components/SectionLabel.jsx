import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

/**
 * The small grey label that opens each section.
 * Set `animated={false}` inside pinned scenes, where the reveal is driven by
 * the scene's own timeline instead of its own scroll trigger.
 */
export default function SectionLabel({ index, children, animated = true, className = "" }) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {index ? (
        <span className="text-xs text-muted-foreground">( {index} )</span>
      ) : null}
      <span className="text-sm tracking-[0.01em] text-muted-foreground">{children}</span>
    </div>
  );

  if (!animated) return content;

  return (
    <Reveal y={16} duration={0.9}>
      {content}
    </Reveal>
  );
}