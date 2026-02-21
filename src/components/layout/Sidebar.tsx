"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { subjects } from "@/lib/subjects";
import Logo from "./Logo";

export default function Sidebar() {
  const pathname = usePathname();

  // Auto-expand whichever subject contains the current page
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(() => {
    const open = new Set<string>();
    for (const s of subjects) {
      if (pathname.startsWith(s.basePath + "/") || pathname === s.basePath) {
        open.add(s.slug);
      }
    }
    return open;
  });

  const toggle = (slug: string) => {
    setOpenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <aside className="w-64 shrink-0 border-r border-sidebar-border bg-sidebar-bg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="block">
          <div className="flex items-center gap-2.5">
            <Logo className="w-7 h-7" />
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-accent">KLAR</span>
            </h1>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {subjects.map((subject) => {
          const isOpen = openSlugs.has(subject.slug);
          const isSubjectActive = pathname.startsWith(subject.basePath);

          return (
            <div key={subject.slug} className="mb-1">
              <button
                onClick={() => toggle(subject.slug)}
                className={`w-full flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider px-2 py-2 rounded-md transition-colors ${
                  isSubjectActive
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span>{subject.name}</span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3 shrink-0"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden mt-1 space-y-1"
                  >
                    {subject.topics.map((topic) => {
                      const href = `${subject.basePath}/${topic.slug}`;
                      const isActive = pathname === href;
                      return (
                        <li key={topic.slug}>
                          <Link
                            href={href}
                            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-accent-light text-accent"
                                : "text-foreground/70 hover:bg-accent-light/50 hover:text-foreground"
                            }`}
                          >
                            {topic.category && (
                              <span className="text-xs text-muted mr-2">
                                {topic.category}
                              </span>
                            )}
                            {topic.name}
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="relative group">
          <a
            href="https://www.paypal.com/paypalme/Awthura"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-lg px-3 py-2 text-xs font-medium bg-accent-light text-accent hover:bg-accent transition-colors hover:text-white"
          >
            ☕ Support this project
          </a>
          <div className="absolute bottom-full left-0 right-0 mb-2 hidden group-hover:block bg-sidebar-bg border border-sidebar-border rounded-lg p-3 shadow-lg">
            <img src="/qrcode.png" alt="Scan to donate via PayPal" className="w-full rounded" />
            <p className="text-xs text-muted text-center mt-2">Scan to donate</p>
          </div>
        </div>
        <p className="text-xs text-muted text-center">
          Knowledge Lab for Algorithms &amp; Reasoning
        </p>
      </div>
    </aside>
  );
}
