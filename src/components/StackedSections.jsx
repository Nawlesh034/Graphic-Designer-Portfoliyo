import { Children } from "react";

/**
 * Sticky panels overlap naturally as each section scrolls into view.
 */
export default function StackedSections({ children }) {
  return (
    <div className="stacked-sections">
      {Children.map(children, (child, i) => (
        <div
          className={i === 0 ? "stack-panel stack-panel--first" : "stack-panel"}
          style={{ zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}