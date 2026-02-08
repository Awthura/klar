"use client";

import katex from "katex";

interface MathBlockProps {
  tex: string;
  display?: boolean;
  highlight?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MathBlock({
  tex,
  display = false,
  highlight = false,
  className = "",
  onMouseEnter,
  onMouseLeave,
}: MathBlockProps) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    trust: true,
  });

  return (
    <span
      className={`${display ? "block" : "inline-block"} ${
        highlight ? "math-highlight" : ""
      } ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
