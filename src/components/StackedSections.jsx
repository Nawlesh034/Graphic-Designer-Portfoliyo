import { Children } from "react";

/**
 * Sticky panels overlap naturally as each section scrolls into view.
 */
export default function StackedSections({ children }) {
  return (
    <div className="stacked-sections">
      {Children.map(children, (child, i) => (
        <div
          className={[
            "stack-panel",
            i === 0 ? "stack-panel--first" : "",
            i === 1 ? "stack-panel--about" : "",
          ].filter(Boolean).join(" ")}
          style={{ zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}