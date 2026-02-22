"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar — hidden on desktop */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b border-sidebar-border bg-sidebar-bg">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-accent-light/50 transition-colors"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Logo className="w-5 h-5" />
          <span className="text-sm font-bold text-accent">KLAR</span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
