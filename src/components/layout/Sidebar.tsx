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
            <Link
              href={subject.basePath}
              className={`block text-xs font-semibold uppercase tracking-wider mb-3 px-2 transition-colors ${
                pathname === subject.basePath
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {subject.icon} {subject.shortName}
            </Link>
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
