"use client";

import { useEffect } from "react";

// Points at whatever public tunnel URL is currently live for the Conference
// Recommender demo (OVGU ATDL project). This changes each time the tunnel
// restarts — update this one constant and redeploy when that happens.
const DEMO_URL = "https://synthesis-pole-under-graduates.trycloudflare.com";

export default function AafswRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = DEMO_URL;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        <span className="text-accent">Conference Recommender</span>
      </h1>
      <p className="text-lg text-muted mb-8">
        AI Agents for Scientific Workflows — Advanced Topics in Deep Learning
      </p>
      <p className="text-muted mb-2">Redirecting you to the live demo…</p>
      <a href={DEMO_URL} className="text-accent underline text-lg break-all">
        {DEMO_URL}
      </a>
    </div>
  );
}
