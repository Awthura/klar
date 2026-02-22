"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { subjects } from "@/lib/subjects";
import Logo from "./Logo";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed top-0 left-0 z-40 h-screen
        lg:sticky lg:top-0 lg:z-auto
        w-64 shrink-0 border-r border-sidebar-border bg-sidebar-bg flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <Link href="/" className="block" onClick={onClose}>
            <div className="flex items-center gap-2.5">
              <Logo className="w-7 h-7" />
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-accent">KLAR</span>
              </h1>
            </div>
          </Link>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-muted hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {subjects.map((subject) => {
            const isExpanded = openSlugs.has(subject.slug);
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
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 shrink-0"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
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
                              onClick={onClose}
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
    </>
  );
}
