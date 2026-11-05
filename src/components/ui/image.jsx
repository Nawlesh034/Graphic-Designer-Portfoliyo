import { useState } from "react";
import { cn } from "@/lib/utils";

export function Image({
  src,
  alt = "",
  className = "",
  fittingType,
  loading = "lazy",
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("image-placeholder", className)}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      data-fitting-type={fittingType}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
