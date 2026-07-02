"use client";

import { useEffect, useState } from "react";

// This page never hardcodes the tunnel URL — it fetches /aafsw-status.json
// at runtime instead, so updating the target (or marking it offline) only
// requires changing that one small file, not rebuilding this page. See
// scripts/start-bridge.sh, which writes this file when the bridge starts
// and stops.
type Status = { online: boolean; url: string | null; updated_at: string };

export default function AafswRedirect() {
  const [status, setStatus] = useState<Status | "loading" | "error">("loading");

  useEffect(() => {
    fetch("/aafsw-status.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Status) => {
        setStatus(data);
        if (data.online && data.url) {
          const timer = setTimeout(() => {
            window.location.href = data.url as string;
          }, 2000);
          return () => clearTimeout(timer);
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        <span className="text-accent">Conference Recommender</span>
      </h1>
      <p className="text-lg text-muted mb-8">
        AI Agents for Scientific Workflows — Advanced Topics in Deep Learning
      </p>

      {status === "loading" && <p className="text-muted">Checking demo status…</p>}

      {status === "error" && (
        <p className="text-muted">
          Couldn&apos;t check demo status right now. Try again shortly.
        </p>
      )}

      {status !== "loading" && status !== "error" && status.online && status.url && (
        <>
          <p className="text-muted mb-2">Redirecting you to the live demo…</p>
          <a href={status.url} className="text-accent underline text-lg break-all">
            {status.url}
          </a>
        </>
      )}

      {status !== "loading" && status !== "error" && !status.online && (
        <p className="text-muted">
          The live demo isn&apos;t running right now — it&apos;s only available
          while its host machine has the bridge script active. Check back
          during a scheduled demo session.
        </p>
      )}
    </div>
  );
}
