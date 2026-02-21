"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightLines?: number[];
  onLineHover?: (line: number | null) => void;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "python",
  highlightLines = [],
  onLineHover,
  className = "",
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const lines = code.split("\n");
    codeToHtml(code, {
      lang: language,
      theme: "github-dark",
      decorations: highlightLines
        .filter((line) => line >= 1 && line <= lines.length)
        .map((line) => ({
          start: { line: line - 1, character: 0 },
          end: { line: line - 1, character: lines[line - 1].length },
          properties: { class: "code-line-highlight" },
        })),
    }).then(setHtml);
  }, [code, language, highlightLines]);

  if (!html) {
    return (
      <pre className={`rounded-lg bg-[#24292e] p-4 text-sm text-gray-300 overflow-x-auto ${className}`}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={`min-w-0 rounded-lg text-sm [&_pre]:p-4 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_.line]:px-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      onMouseMove={(e) => {
        if (!onLineHover) return;
        const target = e.target as HTMLElement;
        const lineEl = target.closest(".line");
        if (lineEl) {
          const lines = Array.from(lineEl.parentElement?.children ?? []);
          const idx = lines.indexOf(lineEl) + 1;
          onLineHover(idx);
        }
      }}
      onMouseLeave={() => onLineHover?.(null)}
    />
  );
}
