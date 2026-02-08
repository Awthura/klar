"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { subjects } from "@/lib/subjects";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-sidebar-border bg-sidebar-bg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-accent">KLAR</span>
          </h1>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {subjects.map((subject) => (
          <div key={subject.slug} className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-2">
              {subject.icon} {subject.shortName}
            </p>
            <ul className="space-y-1">
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
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border text-xs text-muted">
        Knowledge Lab for Algorithms &amp; Reasoning
      </div>
    </aside>
  );
}
